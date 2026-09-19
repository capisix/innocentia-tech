const fs = require("fs");

if (process.platform === "win32") {
  const origReadlink = fs.readlink;
  const origReadlinkSync = fs.readlinkSync;
  const origPromisesReadlink = fs.promises?.readlink;

  fs.readlink = function (path, options, callback) {
    const cb = typeof options === "function" ? options : callback;
    const opts = typeof options === "function" ? undefined : options;
    return origReadlink.call(fs, path, opts, (err, linkString) => {
      if (err && (err.code === "EISDIR" || err.code === "UNKNOWN")) {
        const einvalErr = new Error(`EINVAL: invalid argument, readlink '${path}'`);
        einvalErr.code = "EINVAL";
        return cb(einvalErr);
      }
      return cb(err, linkString);
    });
  };

  fs.readlinkSync = function (path, options) {
    try {
      return origReadlinkSync.call(fs, path, options);
    } catch (err) {
      if (err && (err.code === "EISDIR" || err.code === "UNKNOWN")) {
        const einvalErr = new Error(`EINVAL: invalid argument, readlink '${path}'`);
        einvalErr.code = "EINVAL";
        throw einvalErr;
      }
      throw err;
    }
  };

  if (fs.promises && origPromisesReadlink) {
    fs.promises.readlink = async function (path, options) {
      try {
        return await origPromisesReadlink.call(fs.promises, path, options);
      } catch (err) {
        if (err && (err.code === "EISDIR" || err.code === "UNKNOWN")) {
          const einvalErr = new Error(`EINVAL: invalid argument, readlink '${path}'`);
          einvalErr.code = "EINVAL";
          throw einvalErr;
        }
        throw err;
      }
    };
  }
}

const Module = require("module");
const origLoad = Module._load;

const urlAlphabet = 'useandom-26T1983_40CachedKeyBundle_9o5f7i106g7npqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = (size = 21) => {
  let id = '';
  let i = size;
  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0];
  }
  return id;
};
const customAlphabet = (alphabet, defaultSize = 21) => {
  return (size = defaultSize) => {
    let id = '';
    let i = size;
    while (i--) {
      id += alphabet[(Math.random() * alphabet.length) | 0];
    }
    return id;
  };
};
const nanoidModule = { nanoid, customAlphabet, urlAlphabet, default: nanoid };

const jitiShim = {
  createJiti: function(filename, opts) {
    const jitiInstance = function(id) {
      return require(id);
    };
    jitiInstance.import = async function(id) {
      return require(id);
    };
    return jitiInstance;
  },
  default: function(filename, opts) {
    const jitiInstance = function(id) {
      return require(id);
    };
    jitiInstance.import = async function(id) {
      return require(id);
    };
    return jitiInstance;
  }
};

Module._load = function (request, parent, isMain) {
  if (request === "nanoid" || request === "nanoid/non-secure" || request.startsWith("nanoid/")) {
    return nanoidModule;
  }
  if (request === "jiti" || request.startsWith("jiti/")) {
    return jitiShim;
  }
  return origLoad.apply(this, arguments);
};
