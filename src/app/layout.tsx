import type { Metadata } from "next";
import { Chakra_Petch, Audiowide } from "next/font/google";
import "./globals.css";

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Core",
  description: "Central Online Recreation Environment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${chakraPetch.className} ${audiowide.variable} ${chakraPetch.variable}/* h-full antialiased */`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
