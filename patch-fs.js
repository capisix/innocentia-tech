const fs = require('fs');
const path = require('path');
const Module = require('module');

// Normalize invalid concatenated Windows paths like E:\webapp\C:\Users\... -> C:\Users\...
function fixWinPath(p) {
  if (typeof p === 'string') {
    const m = p.match(/^[a-zA-Z]:.*?[\\\/]([a-zA-Z]:[\\\/].*)$/);
    if (m) {
      return m[1];
    }
    if (/^\.[\/\\][a-zA-Z]:/.test(p)) {
      return p.substring(2);
    }
  }
  return p;
}

// Patch path.relative to avoid cross-drive prefixing
const origRelative = path.relative;
path.relative = function (from, to) {
  const rel = origRelative.call(this, from, to);
  if (typeof rel === 'string' && /^[a-zA-Z]:/.test(rel)) {
    return rel.replace(/\\/g, '/');
  }
  return rel;
};
if (path.win32) {
  const origWin32Relative = path.win32.relative;
  path.win32.relative = function (from, to) {
    const rel = origWin32Relative.call(this, from, to);
    if (typeof rel === 'string' && /^[a-zA-Z]:/.test(rel)) {
      return rel.replace(/\\/g, '/');
    }
    return rel;
  };
}

// Intercept Module._resolveFilename so next/dist/* resolves properly on Drive E
const origResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  if (typeof request === 'string') {
    const req = request.toLowerCase().replace(/\\/g, '/');
    if (req.includes('next/dist/')) {
      const idx = req.indexOf('next/dist/');
      const sub = req.substring(idx);
      const candidate = path.resolve(__dirname, 'node_modules', sub);
      if (fs.existsSync(candidate)) {
        try {
          const stat = origStatSync(candidate);
          if (stat.isDirectory()) {
            const pkg = path.join(candidate, 'package.json');
            if (fs.existsSync(pkg)) {
              try {
                const pjson = JSON.parse(origReadFileSync(pkg, 'utf8'));
                const main = pjson.main || 'index.js';
                return path.resolve(candidate, main);
              } catch (_) {}
            }
            const idxFile = path.join(candidate, 'index.js');
            if (fs.existsSync(idxFile)) return idxFile;
          } else {
            return candidate;
          }
        } catch (_) {}
      }
    }
  }
  return origResolveFilename.call(this, fixWinPath(request), parent, isMain, options);
};

const origLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (typeof request === 'string' && (request.includes('getTypeScriptIntent') || request.includes('get-typescript-intent'))) {
    return {
      getTypeScriptIntent: async function () {
        return null;
      }
    };
  }
  return origLoad.call(this, fixWinPath(request), parent, isMain);
};

// Wrap fs functions
const origExistsSync = fs.existsSync;
fs.existsSync = function (p) {
  return origExistsSync(fixWinPath(p));
};

const origStatSync = fs.statSync;
fs.statSync = function (p, options) {
  return origStatSync(fixWinPath(p), options);
};

const origLstatSync = fs.lstatSync;
fs.lstatSync = function (p, options) {
  return origLstatSync(fixWinPath(p), options);
};

const origReadFileSync = fs.readFileSync;
fs.readFileSync = function (p, options) {
  const fp = fixWinPath(p);
  try {
    return origReadFileSync(fp, options);
  } catch (err) {
    if (err && (err.code === 'EINVAL' || err.code === 'EISDIR')) {
      try {
        if (fs.statSync(fp).isDirectory()) {
          const err2 = new Error(`EISDIR: illegal operation on a directory, read '${fp}'`);
          err2.code = 'EISDIR';
          err2.errno = -4068;
          err2.syscall = 'read';
          err2.path = String(fp);
          throw err2;
        }
      } catch (stErr) {
        if (stErr.code === 'EISDIR') throw stErr;
      }
    }
    throw err;
  }
};

const origOpenSync = fs.openSync;
fs.openSync = function (p, flags, mode) {
  return origOpenSync(fixWinPath(p), flags, mode);
};

const origReaddirSync = fs.readdirSync;
fs.readdirSync = function (p, options) {
  return origReaddirSync(fixWinPath(p), options);
};

// Wrap async fs functions
const origStat = fs.stat;
fs.stat = function (p, ...args) {
  return origStat(fixWinPath(p), ...args);
};

const origLstat = fs.lstat;
fs.lstat = function (p, ...args) {
  return origLstat(fixWinPath(p), ...args);
};

const origReadFile = fs.readFile;
fs.readFile = function (p, ...args) {
  return origReadFile(fixWinPath(p), ...args);
};

// Wrap fs.promises
if (fs.promises) {
  const origPromisesStat = fs.promises.stat;
  if (origPromisesStat) {
    fs.promises.stat = async function (p, options) {
      return await origPromisesStat(fixWinPath(p), options);
    };
  }
  const origPromisesLstat = fs.promises.lstat;
  if (origPromisesLstat) {
    fs.promises.lstat = async function (p, options) {
      return await origPromisesLstat(fixWinPath(p), options);
    };
  }
  const origPromisesReadFile = fs.promises.readFile;
  if (origPromisesReadFile) {
    fs.promises.readFile = async function (p, options) {
      return await origPromisesReadFile(fixWinPath(p), options);
    };
  }
}

// Total realpathSync override for Node v24 Windows compatibility
const origRealpathSync = fs.realpathSync;
function safeRealpathSync(p, options) {
  try {
    return origRealpathSync(fixWinPath(p), options);
  } catch (err) {
    return path.resolve(fixWinPath(p));
  }
}
fs.realpathSync = safeRealpathSync;
fs.realpathSync.native = safeRealpathSync;

if (fs.promises && fs.promises.realpath) {
  const origPromisesRealpath = fs.promises.realpath;
  fs.promises.realpath = async function (p, options) {
    try {
      return await origPromisesRealpath(fixWinPath(p), options);
    } catch (err) {
      return path.resolve(fixWinPath(p));
    }
  };
}

function isNotSymlink(p) {
  try {
    return !fs.lstatSync(p).isSymbolicLink();
  } catch (e) {
    return false;
  }
}

function makeEinval(p) {
  const err = new Error(`EINVAL: invalid argument, readlink '${p}'`);
  err.code = 'EINVAL';
  err.errno = -4071;
  err.syscall = 'readlink';
  err.path = String(p);
  return err;
}

const origReadlinkSync = fs.readlinkSync;
fs.readlinkSync = function (p, options) {
  const fp = fixWinPath(p);
  try {
    return origReadlinkSync(fp, options);
  } catch (err) {
    if (err && err.code === 'EISDIR' && isNotSymlink(fp)) {
      throw makeEinval(fp);
    }
    throw err;
  }
};

const origReadlink = fs.readlink;
fs.readlink = function (p, ...args) {
  const fp = fixWinPath(p);
  const cb = args[args.length - 1];
  if (typeof cb === 'function') {
    return origReadlink(fp, ...args.slice(0, -1), (err, linkString) => {
      if (err && err.code === 'EISDIR' && isNotSymlink(fp)) {
        return cb(makeEinval(fp));
      }
      return cb(err, linkString);
    });
  }
  return origReadlink(fp, ...args);
};

if (fs.promises && fs.promises.readlink) {
  const origPromisesReadlink = fs.promises.readlink;
  fs.promises.readlink = async function (p, options) {
    const fp = fixWinPath(p);
    try {
      return await origPromisesReadlink(fp, options);
    } catch (err) {
      if (err && err.code === 'EISDIR' && isNotSymlink(fp)) {
        throw makeEinval(fp);
      }
      throw err;
    }
  };
}
