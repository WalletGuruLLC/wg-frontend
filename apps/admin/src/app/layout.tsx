"use client";

import type { Viewport } from "next";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@wg-frontend/ui";

import "~/app/globals.css";

import { Toaster } from "@wg-frontend/ui/toast";

import { env } from "~/env";
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
          <QueryClientProvider>
            {props.children}
            {env.NODE_ENV === "development" && (
              <ReactQueryDevtools initialIsOpen={true} />
            )}
          </QueryClientProvider>
        </I18nProvider>
        <Toaster
          position="top-right"
          theme="light"
          className="mt-20"
          toastOptions={{
            className: "bg-black text-white border-none",
          }}
        />
      </body>
    </html>
  );
}
