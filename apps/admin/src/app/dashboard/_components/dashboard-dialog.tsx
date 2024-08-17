"use client";

import type { ReactNode } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { cn } from "@wg-frontend/ui";
import {
  Dialog as _Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@wg-frontend/ui/dialog";

import { DialogContent } from "~/components/dialog";

export default function Dialog(props: {
  trigger: ReactNode;
  children: ReactNode;
  actions?: ReactNode[];
  showCloseButton?: boolean;
  ariaDescribedBy: string;
}) {
  return (
    <_Dialog>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <VisuallyHidden.Root>
        <DialogHeader>
          <DialogTitle />
          <DialogDescription>{props.ariaDescribedBy}</DialogDescription>
        </DialogHeader>
      </VisuallyHidden.Root>
      <DialogContent>
        <div className={cn(props.actions?.length !== 0 && "pb-12")}>
          {props.children}
        </div>
        {props.actions?.length !== 0 && (
          <DialogFooter>{props.actions}</DialogFooter>
        )}
      </DialogContent>
    </_Dialog>
  );
}
