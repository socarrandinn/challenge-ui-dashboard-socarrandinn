import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./css/globals.css";
import AppProvider from "@/providers/app.provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dashboard APP",
  description: "Dashboard APP - Panel de control y análisis de datos",
  generator: "Next.js",
  applicationName: "Dashboard APP",
  keywords: ["dashboard", "panel de control", "análisis", "datos", "métricas"],
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "Dashboard APP",
    title: "Dashboard APP",
    description: "Dashboard APP - Panel de control y análisis de datos",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Dashboard APP",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Dashboard APP",
    description: "Dashboard APP - Panel de control y análisis de datos",
    images: ["/opengraph-image.png"],
  },

  other: {
    google: "noTranslate",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-ES">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
