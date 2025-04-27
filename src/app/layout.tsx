import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils"; 
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import { QueryProvider } from "@/components/query-provider";

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
    <QueryProvider>
      <html lang="en-US">
        <body
          className={cn(inter.className, "antialiased")}
        >
          <Toaster />
          {children}
        </body>
      </html>
    </QueryProvider>
  );
}
