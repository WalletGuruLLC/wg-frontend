"use client";

import React from "react";

import Dialog from "./dashboard-dialog";

export default function ConfirmDialog(props: {
  Icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  actions: React.ReactNode[];
  trigger: React.ReactNode;
  ariaDescribedBy: string;
}) {
  return (
    <Dialog
      trigger={props.trigger}
      actions={props.actions}
      ariaDescribedBy={props.ariaDescribedBy}
    >
      <div className="flex flex-col items-center space-y-8">
        {props.Icon}
        <h1 className="text-2xl font-light">{props.title}</h1>
        <div className="text-center font-light">{props.description}</div>
      </div>
    </Dialog>
  );
}
