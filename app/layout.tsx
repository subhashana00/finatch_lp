import type { Metadata } from "next";
import { Inter, Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Finatch — AI-Powered Financial Intelligence Platform",
  description:
    "Transform your financial operations with AI-powered analytics, smart payments, fraud detection, and automated workflows. Trusted by 10,000+ businesses worldwide.",
  keywords: [
    "fintech",
    "AI finance",
    "payment platform",
    "financial analytics",
    "fraud detection",
    "automated reporting",
    "financial management",
    "SaaS",
    "enterprise finance",
  ],
  authors: [{ name: "Finatch" }],
  creator: "Finatch",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://finatch.io",
    siteName: "Finatch",
    title: "Finatch — AI-Powered Financial Intelligence Platform",
    description:
      "Transform your financial operations with AI-powered analytics, smart payments, fraud detection, and automated workflows.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Finatch Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finatch — AI-Powered Financial Intelligence Platform",
    description:
      "Transform your financial operations with AI-powered analytics, smart payments, and automated workflows.",
    images: ["/og-image.png"],
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Finatch",
  applicationCategory: "FinanceApplication",
  description:
    "AI-Powered Financial Intelligence Platform for smart payments, analytics, automation, and fraud detection.",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0",
    highPrice: "499",
    offerCount: "3",
  },
  operatingSystem: "Web",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "2847",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0A0F2C" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${manrope.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
