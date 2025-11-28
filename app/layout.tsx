import React from "react";
// ... existing code ...
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Metadata } from "next";

// <CHANGE> Updated metadata for DietMentor
const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DietMentor - Admin Dashboard",
  description:
    "Clinic Administrator Dashboard for DietMentor - Guiding Health Through Smart Nutrition",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon.ico",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon.ico",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};
// export const metadata: Metadata = {
//   title: "Dietify – Your Personal Online Dietician",
//   description:
//     "Personalized diet plans, expert nutritional guidance, and disease-specific programs crafted just for you.",
//   generator: "v0.app",
//   icons: {
//     icon: [
//       { url: "/fav.png", type: "image/png" },
//       { url: "/favicon.ico", rel: "shortcut icon" },
//     ],
//     apple: "/fav.png",
//   },
// }
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
