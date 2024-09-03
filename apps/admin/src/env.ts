/* eslint-disable no-restricted-properties */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_ADMIN_BASE_URL: z.string().min(1),
    NEXT_PUBLIC_AUTH_MICROSERVICE_URL: z.string().min(1),
    NEXT_PUBLIC_NOTIFICATION_MICROSERVICE_URL: z.string().min(1),
    NEXT_PUBLIC_COUNTRIES_MICROSERVICE_URL: z.string().min(1),
    NEXT_PUBLIC_WALLET_MICROSERVICE_URL: z.string().min(1),
    NEXT_PUBLIC_CUSTOM_CODES_MICROSERVICE_URL: z.string().min(1),
  },
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },
  runtimeEnv: {
    NEXT_PUBLIC_ADMIN_BASE_URL: process.env.NEXT_PUBLIC_ADMIN_BASE_URL,
    NEXT_PUBLIC_AUTH_MICROSERVICE_URL:
      process.env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL,
    NEXT_PUBLIC_NOTIFICATION_MICROSERVICE_URL:
      process.env.NEXT_PUBLIC_NOTIFICATION_MICROSERVICE_URL,
    NEXT_PUBLIC_COUNTRIES_MICROSERVICE_URL:
      process.env.NEXT_PUBLIC_COUNTRIES_MICROSERVICE_URL,
    NEXT_PUBLIC_WALLET_MICROSERVICE_URL:
      process.env.NEXT_PUBLIC_WALLET_MICROSERVICE_URL,
    NEXT_PUBLIC_CUSTOM_CODES_MICROSERVICE_URL:
      process.env.NEXT_PUBLIC_CUSTOM_CODES_MICROSERVICE_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
});
