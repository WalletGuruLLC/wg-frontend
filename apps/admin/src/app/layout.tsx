"use client";

import type { Viewport } from "next";
import { Montserrat } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { cn } from "@wg-frontend/ui";

import "~/app/globals.css";

import { Toaster } from "@wg-frontend/ui/toast";

import { env } from "~/env";
import { ErrorsProvider } from "~/lib/data-access/errors";
import QueryClientProvider from "~/lib/data-access/provider";
import { I18nProvider } from "~/lib/i18n";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const monsterrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          monsterrat.className,
        )}
      >
        {/* The order of the providers matters, test before changing something */}
        <I18nProvider>
          <QueryClientProvider>
            <ErrorsProvider>
              {props.children}
              {env.NODE_ENV === "development" && (
                <ReactQueryDevtools initialIsOpen={true} />
              )}
              <Toaster
                position="top-right"
                theme="light"
                className="mt-20"
                toastOptions={{
                  className: "bg-black text-white border-none",
                }}
              />
            </ErrorsProvider>
          </QueryClientProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
