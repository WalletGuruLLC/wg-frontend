import * as React from "react";
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from "lucide-react";

import { cn } from "@wg-frontend/ui";

import type { InputProps } from "./input";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";

/**
 * PasswordInputComponent is a customizable password input field with a visibility toggle button.
 * 
 * This component allows users to toggle the visibility of the password input field. It includes an 
 * icon button that shows or hides the password, providing a better user experience when entering 
 * passwords. The component is implemented using React and Tailwind CSS.
 * 
 * @component
 * @example
 * <PasswordInput
 *   value="password123"
 *   disabled={false}
 *   className="additional-class"
 *   onChange={(e) => console.log(e.target.value)}
 * />
 * 
 * @param {object} props - Component properties.
 * @param {string} [props.className] - Additional CSS classes for the component.
 * @param {boolean} [props.disabled=false] - Disables the button if true.
 * @param {string} [props.value=""] - Value of the password input.
 * @param {React.Ref<HTMLInputElement>} ref - Ref to forward to the input element.
 * @returns {JSX.Element} - Rendered PasswordInput component.
 * 
 * @author [Jessica Sandoval]
 */

const PasswordInputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    // State to manage the visibility of the password
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <Label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Password
          </span>
        </Label>
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(
            "flex h-9 w-full border-0 border-b-2 bg-transparent px-3 py-1 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          //className={cn("pr-10", className)}
          className={cn(
            "flex h-9 w-full border-0 border-b-2 bg-transparent px-3 py-1 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
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
          onClick={() => setShowPassword((prev) => !prev)} // Toggle password visibility on click
          disabled={props.value === "" || props.disabled} // Disable button if input is empty or disabled
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

// Set display name for debugging purposes
PasswordInputComponent.displayName = "PasswordInput";

// Export the component for use
export const PasswordInput = PasswordInputComponent;
