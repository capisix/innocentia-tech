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
