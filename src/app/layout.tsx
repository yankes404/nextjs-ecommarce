import { Suspense } from "react";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils"; 
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/query-provider";

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
    <SessionProvider>
      <Suspense>
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
      </Suspense>
    </SessionProvider>
  );
}
