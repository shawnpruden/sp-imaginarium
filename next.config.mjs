/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io',
        protocol: 'https',
      },
      { hostname: 'lh3.googleusercontent.com', protocol: 'https' },
      { hostname: 'avatars.githubusercontent.com', protocol: 'https' },
    ],
  },
};

export default nextConfig;
