import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@wg-frontend/ui";

import "~/app/globals.css";

import { env } from "~/env";

export const metadata: Metadata = {
  title: "wg-frontend",
  description: "desc",
  openGraph: {
    title: "wg-frontend",
    description: "desc",
    siteName: "wg-frontend",
  },
  twitter: {
    card: "summary_large_image",
    site: "@rbestardpino",
    creator: "@rbestardpino",
  },
};

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
        {env.NODE_ENV}
        {env.NEXT_PUBLIC_MICROSERVICE1_URL}
        {props.children}
      </body>
    </html>
  );
}
