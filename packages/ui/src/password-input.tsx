import * as React from "react";
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from "lucide-react";

import { cn } from "@wg-frontend/ui";

import type { InputProps } from "./input";
import { Button } from "./button";
import { Input } from "./input";

const PasswordInputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Password
          </span>
        </label>
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(
            "flex h-9 w-full border-0 border-b-2 bg-transparent px-3 py-1 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          //className={cn("pr-10", className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => {
            console.log('Button clicked'); // Debugging line
            setShowPassword((prev) => !prev);
          }}
         // onClick={() => setShowPassword((prev) => !prev)}
          disabled={props.value === "" || props.disabled}
        >
          {showPassword ? (
            <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <EyeIcon className="h-4 w-4" aria-hidden="true" />
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
