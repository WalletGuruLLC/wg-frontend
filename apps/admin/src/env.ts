/* eslint-disable no-restricted-properties */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  shared: {
    NEXT_PUBLIC_MICROSERVICE1_URL: z.string().min(1),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_MICROSERVICE1_URL: process.env.NEXT_PUBLIC_MICROSERVICE1_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
});
