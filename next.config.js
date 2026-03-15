/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ─── External image domains ───────────────────────────────
    // Add domains for any external images you use, e.g.:
    // { protocol: 'https', hostname: 'images.unsplash.com' },
    // { protocol: 'https', hostname: 'res.cloudinary.com' },
    remotePatterns: [],

    // Allows SVG placeholder files during development.
    // Safe to remove once you've replaced all cover.jpg placeholders
    // with real images.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },
}

module.exports = nextConfig
