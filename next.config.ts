import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
   allowedDevOrigins: ['192.168.9.3', 'localhost', '192.168.0.47', '*.local'],
};

export default nextConfig;
