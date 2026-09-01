import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://stackdvending.co.za";
const SITE_DESCRIPTION =
  "STACKD installs and manages smart, automated vending machines in premium South African hospitality venues — cashless, age-verified, and fully remote-managed. Our first automated retail solution focuses on premium vape products.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "STACKD | Smart Vending Machines for Hospitality Venues in South Africa",
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "STACKD | Smart Vending Machines for Hospitality Venues",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "STACKD",
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "STACKD | Smart Vending Machines for Hospitality Venues",
    description: SITE_DESCRIPTION,
  },
  verification: {
    other: {
      "msvalidate.01": "1050877A9F9E7FC044C920A508438034",
    },
  },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "STACKD",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/derivatives/icon-black.svg`,
  description: SITE_DESCRIPTION,
  areaServed: {
    "@type": "Country",
    name: "South Africa",
  },
  sameAs: [],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-charcoal text-offwhite">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
