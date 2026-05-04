import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    // 允许 SVG 类型（placehold.co 返回 SVG）
    dangerouslyAllowSVG: true,
    // 增加超时时间（默认 30s，改为 60s）
    minimumCacheTTL: 60,
  },
  // 禁用 Google Fonts 优化（避免超时）
  optimizeFonts: false,
};

export default nextConfig;
