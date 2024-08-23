"use client";

import React from "react";

import { DialogFooter } from "@wg-frontend/ui/dialog";

import type { Props as DialogProps } from "./dashboard-dialog";
import Dialog from "./dashboard-dialog";

export default function ConfirmDialog(
  props: {
    Icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
    actions: React.ReactNode[];
  } & Omit<DialogProps, "children">,
) {
  return (
    <Dialog
      isOpen={props.isOpen}
      toggleOpen={props.toggleOpen}
      trigger={props.trigger}
      ariaDescribedBy={props.ariaDescribedBy}
    >
      <div className="flex flex-col items-center space-y-8">
        {props.Icon}
        <h1 className="text-2xl font-light">{props.title}</h1>
        <div className="text-center font-light">{props.description}</div>
        {props.actions.length !== 0 && (
          <DialogFooter className="w-full">{props.actions}</DialogFooter>
        )}
      </div>
    </Dialog>
  );
}
