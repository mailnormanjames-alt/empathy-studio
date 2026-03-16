/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },

  // Skip ESLint during production builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Skip TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
