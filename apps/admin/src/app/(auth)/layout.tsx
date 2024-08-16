"use client";

import Image from "next/image";

import Metatags from "~/components/metatags";
import { useAuthedUserInfoQuery } from "~/lib/data-access";

export default function AuthLayot(props: { children: React.ReactNode }) {
  const { data, error, isLoading } = useAuthedUserInfoQuery();
  console.log({ data, error, isLoading });

  return (
    <main>
      <Metatags />

      <div className="flex h-screen items-center justify-center overflow-auto bg-black text-white">
        <div className="flex flex-col items-center space-y-12">
          <Image
            src="/logos/imagotype.png"
            className="w-auto"
            alt="Logo"
            width={213}
            height={48}
            priority
          />
          <div className="w-[500px]">{props.children}</div>
        </div>
      </div>
    </main>
  );
}
