const packageInfo = require("./package.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    version: packageInfo.version,
  },
};

module.exports = nextConfig;
