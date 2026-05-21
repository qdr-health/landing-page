import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  async rewrites() {
    return [
      { source: "/AGENTS.md", destination: "/api/agents-md" },
      { source: "/agents.md", destination: "/api/agents-md" },
    ];
  },
};

export default nextConfig;
