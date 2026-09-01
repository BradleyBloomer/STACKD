import type { MetadataRoute } from "next";

const SITE_URL = "https://stackdvending.co.za";

const ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/how-it-works", priority: 0.9 },
  { path: "/why-stackd", priority: 0.9 },
  { path: "/partner", priority: 0.8 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    priority,
  }));
}
