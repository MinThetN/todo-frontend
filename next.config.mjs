/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      // API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
      API_BASE_URL: process.env.API_BASE_URL,  // Example environment variable
    },
    reactStrictMode: true,
    // Optionally add more Next.js configurations here
  };
  
  export default nextConfig;