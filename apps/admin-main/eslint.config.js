import baseConfig, { restrictEnvAccess } from "@wg-frontend/eslint-config/base";
import nextjsConfig from "@wg-frontend/eslint-config/nextjs";
import reactConfig from "@wg-frontend/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
