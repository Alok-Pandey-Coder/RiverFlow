import type { NextConfig } from "next";

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  {
    protocol: "https",
    hostname: "cloud.appwrite.io",
    pathname: "/v1/**",
  },
  {
    protocol: "https",
    hostname: "*.cloud.appwrite.io",
    pathname: "/v1/**",
  },
];

if (process.env.NEXT_PUBLIC_APPWRITE_HOST_URL) {
  try {
    const { protocol, hostname } = new URL(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL);
    remotePatterns.push({
      protocol: protocol.replace(":", "") as "http" | "https",
      hostname,
      pathname: "/v1/**",
    });
  } catch {
    // ignore invalid URL; fallback to defaults above
  }
}

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns,
  },
};

export default nextConfig;
