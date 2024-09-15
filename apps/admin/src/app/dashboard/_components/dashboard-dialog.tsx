"use client";

import type { ReactNode } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import {
  Dialog as _Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@wg-frontend/ui/dialog";

import { DialogContent } from "~/components/dialog";

export interface Props {
  isOpen: boolean;
  toggleOpen: () => void;
  trigger: ReactNode;
  children: ReactNode;
  ariaDescribedBy: string;
  contentClassName?: string;
}

export default function Dialog(props: Props) {
  return (
    <_Dialog open={props.isOpen} onOpenChange={props.toggleOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <VisuallyHidden.Root>
        <DialogHeader>
          <DialogTitle />
          <DialogDescription>{props.ariaDescribedBy}</DialogDescription>
        </DialogHeader>
      </VisuallyHidden.Root>
      <DialogContent className={props.contentClassName}>
        {props.children}
      </DialogContent>
    </_Dialog>
  );
}
