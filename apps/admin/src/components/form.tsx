"use client";

import React from "react";

import { cn } from "@wg-frontend/ui";
import { useFormField } from "@wg-frontend/ui/form";

import type { errorsDict } from "~/lib/i18n/errors";
import { useI18n } from "~/lib/i18n";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const { value } = useI18n(
    error?.message as keyof (typeof errorsDict)["en" | "es"],
  );

  if (!error) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {value}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export { FormMessage };
