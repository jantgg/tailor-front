// next.config.js

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['video-images.vice.com', 'media-cdn.tripadvisor.com'],
    },
};

export default nextConfig;
