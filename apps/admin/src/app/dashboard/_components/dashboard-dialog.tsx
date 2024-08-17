"use client";

import type { ReactNode } from "react";

import { cn } from "@wg-frontend/ui";

import {
  Dialog as _Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "~/components/dialog";

export default function Dialog(props: {
  trigger: ReactNode;
  children: ReactNode;
  actions?: ReactNode[];
  showCloseButton?: boolean;
}) {
  return (
    <_Dialog>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
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
