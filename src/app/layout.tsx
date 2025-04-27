import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils"; 
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuyAnything",
  description: "BuyAnything is platform that allows you to buy anything you want",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body
        className={cn(inter.className, "antialiased")}
      >
        {children}
      </body>
    </html>
  );
}
