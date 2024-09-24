import * as React from "react";

import { cn } from "@wg-frontend/ui";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex h-32 w-full border-b border-black bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-[#A1A1A1] placeholder:text-muted-foreground focus-visible:border-[#3678B1] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
