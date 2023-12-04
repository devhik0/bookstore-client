/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.IMG_HOST,
        port: "",
        pathname: process.env.IMG_PATH,
      },
    ],
  },
};

module.exports = nextConfig;
