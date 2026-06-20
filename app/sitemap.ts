import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/agents`, lastModified: new Date() },
    { url: `${base}/search`, lastModified: new Date() },
    { url: `${base}/llms.txt`, lastModified: new Date() },
  ];
}
