import fs from "node:fs";

// Patch fs.readlink / readlinkSync on Windows where non-symlinks on certain filesystems throw EISDIR instead of EINVAL
if (process.platform === "win32") {
  const origReadlink = fs.readlink;
  const origReadlinkSync = fs.readlinkSync;

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

  if (fs.promises && fs.promises.readlink) {
    const origPromisesReadlink = fs.promises.readlink;
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.symlinks = false;
    config.cache = false;
    return config;
  },
};

export default nextConfig;
