import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from '@/components/nav-bar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "sprite type",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&display=swap" rel="stylesheet"></link>
      <link href="globals.css" rel="stylesheet"></link>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`custom-cursor ${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <div className="flex h-screen flex-col">
          <NavBar />
          <div className="flex-grow p-6 md:p-12">{children}</div>
        </div>
      </body>
    </html>
  );
}
