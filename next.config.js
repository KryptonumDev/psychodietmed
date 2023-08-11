/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/specjalisci',
        destination: '/zespol',
        permanent: false,
      },
    ]
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'psychodietmed.headlesshub.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
