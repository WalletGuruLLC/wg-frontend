import baseConfig, { restrictEnvAccess } from "@paystreme/eslint-config/base";
import nextjsConfig from "@paystreme/eslint-config/nextjs";
import reactConfig from "@paystreme/eslint-config/react";

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
