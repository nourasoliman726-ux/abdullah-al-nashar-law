// /** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // لو هتستخدم دومين تاني ضيفه هنا
      // {
      //   protocol: "https",
      //   hostname: "example.com",
      // },
    ],
  },
};

module.exports = nextConfig;