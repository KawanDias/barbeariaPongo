import withPWA from "next-pwa";

const withPwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development"
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] }
};

export default withPwaConfig(nextConfig);
