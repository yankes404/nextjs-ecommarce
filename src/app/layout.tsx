import { Suspense } from "react";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { cn } from "@/lib/utils"; 
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/query-provider";
import { LoadingBar } from "@/components/loading-bar";
import { ThemeProvider } from "@/components/theme-provider";

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
        <NuqsAdapter>
          <QueryProvider>
            <html lang="en-US" suppressHydrationWarning>
              <body
                className={cn(inter.className, "antialiased")}
              >
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                >
                  <Toaster />
                  <LoadingBar />
                  {children}
                </ThemeProvider>
              </body>
            </html>
          </QueryProvider>
        </NuqsAdapter>
      </Suspense>
    </SessionProvider>
  );
}
