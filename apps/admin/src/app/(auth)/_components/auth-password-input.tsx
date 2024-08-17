"use client";

import * as React from "react";
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from "lucide-react";

import { cn } from "@wg-frontend/ui";
import { Button } from "@wg-frontend/ui/button";

import type { InputProps } from "./auth-input";
import { Input } from "./auth-input";

const PasswordInputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent hover:text-[#3678B1]"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={props.value === "" || props.disabled}
        >
          {showPassword ? (
            <EyeIcon
              strokeWidth={0.75}
              className="h-4 w-4"
              aria-hidden="true"
            />
          ) : (
            <EyeOffIcon
              strokeWidth={0.75}
              className="h-4 w-4"
              aria-hidden="true"
            />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
    );
  },
);
PasswordInputComponent.displayName = "PasswordInput";

export const PasswordInput = PasswordInputComponent;
