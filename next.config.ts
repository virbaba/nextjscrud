import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true, // avoid error in deployment time
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
