import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SB Carpet and Furniture Ltd.",
  description:
    "Premium carpets and stylish furniture for your home or business.",
  generator: "SB Web Team",
  keywords: [
    "carpets",
    "vinyl",
    "furniture",
    "interior design",
    "home decor",
    "UK furniture store",
  ],
  authors: [{ name: "SB Carpet and Furniture Ltd." }],
  applicationName: "SB Furniture App",
  icons: {
    icon: "/favicon.png", // This is the key line
  },
  creator: "Muneeb Nawaz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
