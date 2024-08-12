"use client";

import Head from "next/head";
import logo from "public/logos/main.png";

import { env } from "~/env";

interface Props {
  title?: string;
  description?: string;
  image?: string;
  ogEndpoint?: string;
}

export default function Metatags({
  title = "WG Admin",
  description = "WG Admin",
  image = logo.src,
  ogEndpoint = "",
}: Props) {
  const ogURL = env.NEXT_PUBLIC_ADMIN_BASE_URL + ogEndpoint;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="WG Admin" />
      <meta name="copyright" content="WG Admin" />
      <meta name="robots" content="index" />
      <link rel="canonical" href={env.NEXT_PUBLIC_ADMIN_BASE_URL} />

      <meta property="og:site_name" content="WG Admin" />
      <meta property="og:url" content={ogURL} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:domain" content={env.NEXT_PUBLIC_ADMIN_BASE_URL} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
