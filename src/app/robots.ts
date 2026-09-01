import type { MetadataRoute } from "next";

const SITE_URL = "https://stackdvending.co.za";

// Deliberately permissive for AI answer-engine crawlers (GPTBot, ClaudeBot,
// PerplexityBot, Google-Extended, etc.) as well as classic search - STACKD
// wants to be discoverable and citable by both. Only /api/ (no public
// content) and /design-review/ (an internal review page, already marked
// noindex on the page itself) are excluded.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/design-review/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
