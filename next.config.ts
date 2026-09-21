import type { NextConfig } from "next";

// The site is published as a static export at https://tewei02.github.io/Carbon.Negtive/
const basePath = "/Carbon.Negtive";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
