import type { Metadata } from "next";
import { Geist, Geist_Mono, Rajdhani, Space_Grotesk } from "next/font/google";
import "./globals.css";
import StickyHeader from "@/components/StickyHeader";
import SecurityWrapper from "@/components/ui/SecurityWrapper";
import Preloader from "@/components/ui/Preloader";
import SmoothScrolling from "@/components/ui/SmoothScrolling";
import InAppBrowserDetector from "@/components/ui/InAppBrowserDetector";

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
  title: "Mahdi | 3D & CGI Artist",
  description: "A visually stunning portfolio showcasing high-end 3D design, CGI rendering, and immersive interactive web experiences by Mahdi.",
  openGraph: {
    title: "Mahdi | Premium 3D Portfolio",
    description: "Explore cinematic 3D renders, CGI projects, and immersive web experiences.",
    url: "https://mahdi.studio",
    siteName: "Mahdi 3D Portfolio",
    images: [
      {
        url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1200/portfolio/hero_frames/frame_00150.jpg",
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
    title: "Mahdi | Premium 3D Portfolio",
    description: "Explore cinematic 3D renders, CGI projects, and immersive web experiences.",
    images: ["https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1200/portfolio/hero_frames/frame_00150.jpg"],
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
      <body className="flex flex-col selection:bg-fuchsia-500/30 selection:text-white overflow-x-hidden">
        <InAppBrowserDetector />
        <SecurityWrapper>
          <SmoothScrolling>
            <Preloader />
            <StickyHeader />
            {children}
          </SmoothScrolling>
        </SecurityWrapper>
      </body>
    </html>
  );
}
