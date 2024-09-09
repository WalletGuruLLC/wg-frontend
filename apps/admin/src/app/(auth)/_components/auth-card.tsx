"use client";

import type { ReactNode } from "react";

import { Card } from "@wg-frontend/ui/card";
import { Separator } from "@wg-frontend/ui/separator";

export default function AuthCard(props: {
  title: string;
  subtitle?: string;
  content: ReactNode;
  primaryButton: ReactNode;
  secondaryButton?: ReactNode;
}) {
  return (
    <Card className="flex flex-col space-y-12 rounded-[32px] border-[0.5px] bg-[#101010] px-12 py-9">
      <div className="flex w-full flex-col text-white">
        <Separator className="h-1 w-[66px] bg-[#00B0FB]" />
        <h1 className="pt-3 text-2xl font-normal">{props.title}</h1>
        {props.subtitle && <p className="pt-1 text-lg">{props.subtitle}</p>}
      </div>
      <div>{props.content}</div>
      <div className="space-y-4">
        <div>{props.primaryButton}</div>
        <div>{props.secondaryButton}</div>
      </div>
    </Card>
  );
}
