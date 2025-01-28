import nextra from "nextra";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};
const withNextra = nextra({});

export default withNextra(nextConfig);
