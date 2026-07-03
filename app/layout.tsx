import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { site } from "./data/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Rhythmic Chaos — Official Website",
    template: "%s | Rhythmic Chaos",
  },
  description: site.description,
  keywords: [
    "Rhythmic Chaos",
    "electronic music",
    "house music",
    "progressive house",
    "DJ",
    "producer",
    "EDM",
  ],
  openGraph: {
    title: "Rhythmic Chaos — Official Website",
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: [{ url: "/Logo.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rhythmic Chaos — Official Website",
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
