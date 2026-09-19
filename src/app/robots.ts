import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://innocentia.tech";
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/proyectos",
          "/proyectos/",
          "/blog",
          "/blog/",
          "/faq",
          "/crear-proyecto",
          "/images/",
          "/_next/static/",
        ],
        disallow: [
          "/portal",
          "/portal/",
          "/api/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/portal",
          "/portal/",
          "/api/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
