import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@paystreme/ui";

import "~/app/globals.css";

export const metadata: Metadata = {
  title: "Paystreme",
  description: "desc",
  openGraph: {
    title: "Paystreme",
    description: "desc",
    siteName: "Paystreme",
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
          "bg-background text-foreground min-h-screen font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        {props.children}
      </body>
    </html>
  );
}
