const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://testilo.maheshlangote.in";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/t/"],
        disallow: ["/admin/", "/login", "/register", "/t/*/review/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
