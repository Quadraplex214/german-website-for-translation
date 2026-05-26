import type { NextConfig } from "next";

const isGithubPages =
  process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";

const repoName = "german-website-for-translation";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  ...(isGithubPages && {
    output: "export",
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`,
  }),
};

export default nextConfig;