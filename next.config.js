/** @type {import("next").NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
  turbopack: {
    root: ".",
  },
}
module.exports = nextConfig
