/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dkckcusqogzbwetnizwe.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/books/**",
      },
    ],
  },
};

module.exports = nextConfig;
