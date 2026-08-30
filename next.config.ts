import type { NextConfig } from "next";
import fs from "fs";

// Fix Node v24 fs.readlink bug on Windows where readlink on regular files/directories returns EISDIR instead of EINVAL
const origReadlinkSync = fs.readlinkSync;
(fs as any).readlinkSync = function (p: fs.PathLike, options?: any) {
  try {
    return origReadlinkSync(p, options);
  } catch (err: any) {
    if (err && err.code === "EISDIR") {
      try {
        if (!fs.lstatSync(p).isSymbolicLink()) {
          const einval: any = new Error(`EINVAL: invalid argument, readlink '${p}'`);
          einval.code = "EINVAL";
          throw einval;
        }
      } catch (e: any) {
        if (e && e.code === "EINVAL") throw e;
      }
    }
    throw err;
  }
};

const origReadlink = fs.readlink;
(fs as any).readlink = function (p: fs.PathLike, ...args: any[]) {
  const cb = args[args.length - 1];
  if (typeof cb === "function") {
    return origReadlink(p, ...args.slice(0, -1), (err: any, linkString: any) => {
      if (err && err.code === "EISDIR") {
        try {
          if (!fs.lstatSync(p).isSymbolicLink()) {
            const einval: any = new Error(`EINVAL: invalid argument, readlink '${p}'`);
            einval.code = "EINVAL";
            return cb(einval);
          }
        } catch (_) {}
      }
      return cb(err, linkString);
    });
  }
  return (origReadlink as any)(p, ...args);
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
