import type { Metadata } from "next";
import { Italianno, Cormorant_Garamond, Cinzel, Inter } from "next/font/google";
import "./globals.css";

const italianno = Italianno({
  variable: "--font-italianno",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abigiya & Tetemek · 26 May 2026",
  description:
    "Join us as we celebrate the wedding of Abigiya & Tetemek on 26 May 2026 in Addis Ababa.",
  openGraph: {
    title: "Abigiya & Tetemek · 26 May 2026",
    description: "Together with our families — you are invited.",
    type: "website",
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
      className={`${italianno.variable} ${cormorant.variable} ${cinzel.variable} ${inter.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
