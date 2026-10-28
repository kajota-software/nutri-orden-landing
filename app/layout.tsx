import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { meta } from "@/content/landing";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  weight: "500",
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: meta.title,
  description: meta.description,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "48x48" },
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "es_CR",
    siteName: "NutriOrden",
    title: meta.ogTitle,
    description: meta.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "NutriOrden" }],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.ogTitle,
    description: meta.description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  // Mismo valor que el theme-color del kit (web/head-snippet.html).
  themeColor: "#5E8B52",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" data-theme="light" className={`${fraunces.variable} ${figtree.variable}`}>
      <body className="min-h-dvh bg-bg font-sans text-body text-ink">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
