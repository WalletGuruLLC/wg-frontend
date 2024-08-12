"use client";

import Head from "next/head";

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
  image = "logos/main.png",
  ogEndpoint = "",
}: Props) {
  const ogURL = env.NEXT_PUBLIC_ADMIN_BASE_URL + ogEndpoint;
  const imageUrl = env.NEXT_PUBLIC_ADMIN_BASE_URL + image;
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
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:domain" content={env.NEXT_PUBLIC_ADMIN_BASE_URL} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
}
