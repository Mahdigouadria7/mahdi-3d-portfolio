import type { Metadata } from "next";
import { Geist, Geist_Mono, Rajdhani, Space_Grotesk } from "next/font/google";
import "./globals.css";
import StickyHeader from "@/components/StickyHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-rajdhani",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mahdi | 3D Portfolio",
  description: "A visually stunning 3D portfolio of Mahdi showcasing outstanding modern web design and interactive experiences.",
  openGraph: {
    title: "Mahdi | 3D Portfolio",
    description: "Interactive 3D portfolio using React Three Fiber.",
    url: "https://mahdi.portfolio.example.com",
    siteName: "Mahdi 3D Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mahdi 3D Portfolio Cover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahdi | 3D Portfolio",
    description: "Interactive 3D portfolio using React Three Fiber.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${rajdhani.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="flex flex-col">
        <StickyHeader />
        {children}
      </body>
    </html>
  );
}
