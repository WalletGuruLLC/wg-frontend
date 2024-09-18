"use server";

import { redirect } from "next/navigation";

// We need to mark this function as async so that we can have it as an action.
// eslint-disable-next-line @typescript-eslint/require-await
export async function navigate(url: string) {
  redirect(url);
}
