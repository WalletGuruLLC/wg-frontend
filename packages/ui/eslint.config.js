import baseConfig from "@paystreme/eslint-config/base";
import reactConfig from "@paystreme/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [],
  },
  ...baseConfig,
  ...reactConfig,
];
