import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: Parameters<typeof cx>) => twMerge(cx(inputs));

export { cn };

export type SVGProps = Omit<
  React.SVGProps<SVGSVGElement>,
  "role" | "viewBox" | "xmlns"
>;
