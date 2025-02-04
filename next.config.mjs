/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com", // added this so our app can access image from clerk.
      },
      {
        protocol: "https",
        hostname: "yexictkjvucwygxiyqsr.supabase.co", //added this so we can retrieve image from our supabase.
      },
    ],
  },
};

export default nextConfig;
