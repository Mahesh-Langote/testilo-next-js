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

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: "Testilo | Smart Online Assessment & Proctoring",
  description: "Testilo is the free, simplest way to generate, proctor, and grade exams online. Transform how you measure knowledge.",
  keywords: ["online exam", "test maker", "proctoring", "smart grading", "edtech", "assessments", "free exam builder"],
  openGraph: {
    title: "Testilo | Build Free Smart Tests In Seconds",
    description: "The simplest way to create and grade assessments. Join thousands of educators and enterprises.",
    url: "https://testilo.com",
    siteName: "Testilo",
    images: [
      {
        url: "/og-image.png", // We will generate this or use logo as fallback if missing
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
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
