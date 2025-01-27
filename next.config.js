/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  // Remove basePath and assetPrefix if you're not deploying to a subdirectory
  // basePath: process.env.NODE_ENV === "production" ? "/your-repo-name" : "",
  // assetPrefix: process.env.NODE_ENV === "production" ? "/your-repo-name" : "",
}

module.exports = nextConfig


