import baseConfig from "@wg-frontend/eslint-config/base";
import reactConfig from "@wg-frontend/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [],
  },
  ...baseConfig,
  ...reactConfig,
];
