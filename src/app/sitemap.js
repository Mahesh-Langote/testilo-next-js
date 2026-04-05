const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://testilo.maheshlangote.in";

export default function sitemap() {
  const now = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
