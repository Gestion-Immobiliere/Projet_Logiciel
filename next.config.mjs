/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverComponentsExternalPackages: ['socket.io'],
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'a2dimmobilier.com',
          pathname: '/wp-content/uploads/**',
        },
      ],
    },
  };
  
  export default nextConfig;