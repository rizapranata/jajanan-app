import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/auth/:path*",
        destination: "http://localhost:3000/auth/:path*", // Express backend
      },
    ];
  },
};

export default nextConfig;
