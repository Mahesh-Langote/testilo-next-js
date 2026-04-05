import { Geist, Geist_Mono, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://testilo.maheshlangote.in";
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Testilo",
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      sameAs: [siteUrl],
    },
    {
      "@type": "WebSite",
      name: "Testilo",
      url: siteUrl,
      description: "Smart online assessment and proctoring platform.",
      inLanguage: "en",
    },
  ],
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Testilo",
  title: {
    default: "Testilo | Smart Online Assessment & Proctoring",
    template: "%s | Testilo",
  },
  description: "Testilo is the free, simplest way to generate, proctor, and grade exams online. Transform how you measure knowledge.",
  keywords: ["online exam", "test maker", "proctoring", "smart grading", "edtech", "assessments", "free exam builder"],
  authors: [{ name: "Testilo" }],
  creator: "Testilo",
  publisher: "Testilo",
  category: "education",
  referrer: "origin-when-cross-origin",
  manifest: "/site.webmanifest",
  classification: "Education Technology",
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Testilo",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Testilo | Build Free Smart Tests In Seconds",
    description: "The simplest way to create and grade assessments. Join thousands of educators and enterprises.",
    url: siteUrl,
    siteName: "Testilo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Testilo Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Testilo | Smart Online Assessments",
    description: "Generate, distribute, and automatically grade exams online in seconds.",
    images: ["/og-image.png"],
    creator: "@testilo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/logo.png", color: "#5B21B6" }],
  },
};

export const viewport = {
  themeColor: "#5B21B6",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
