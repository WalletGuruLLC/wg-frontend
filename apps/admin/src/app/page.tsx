"use client";

import { Button } from "@wg-frontend/ui/button";

import { env } from "~/env";

export default function HomePage() {
  return (
    <main className="container h-screen py-16">
      Hello world {env.NEXT_PUBLIC_MICROSERVICE1_URL}
      {env.NODE_ENV}
      <Button variant="destructive">Click me</Button>
    </main>
  );
}
