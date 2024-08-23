"use client";

import type { Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@wg-frontend/ui";

import "~/app/globals.css";

import { Toaster } from "@wg-frontend/ui/toast";

import QueryClientProvider from "~/lib/data-access/provider";
import { I18nProvider } from "~/lib/i18n";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <I18nProvider>
          <QueryClientProvider>{props.children}</QueryClientProvider>
        </I18nProvider>
        <Toaster position="top-right" richColors theme="light" />
      </body>
    </html>
  );
}
