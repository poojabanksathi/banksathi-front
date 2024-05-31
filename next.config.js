/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  swcMinify: false, // it should be false by default

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'devcdn.banksathi.com',
        pathname: '/images/**',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'www.linkedin.com'
      },
      {
        protocol: 'https',
        hostname: 'devcdn.banksathi.com'
      },
      {
        protocol: 'https',
        hostname: 'media.banksathi.com'
      }
    ]
    // ],
    // minimumCacheTTL:1500000,
    // domains: ['https://tryfront.banksathi.com/'], //make it 'your-domain.com'
    //  domains: ['devcdn.banksathi.com'], //make it 'your-domain.com'
  },
}

module.exports = nextConfig
