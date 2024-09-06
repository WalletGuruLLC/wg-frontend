"use client";

import * as React from "react";

import { cn } from "@wg-frontend/ui";
import { Button } from "@wg-frontend/ui/button";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-11 w-full border-b border-black bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#A1A1A1] focus-visible:border-[#3678B1] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {props.icon && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            tabIndex={-1}
            className="absolute right-0 top-0 h-full cursor-default px-3 py-2 hover:bg-transparent hover:text-white"
            disabled={props.value === "" || props.disabled}
          >
            {props.icon}
          </Button>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
