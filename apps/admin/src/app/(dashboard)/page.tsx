"use client";

import { WidgetItem } from "~/components";

export default function DashboardPage() {
  return (
    <main className="container h-screen py-16">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <WidgetItem />
        <WidgetItem />
        <WidgetItem />
        <WidgetItem />
      </div>
    </main>
  );
}
