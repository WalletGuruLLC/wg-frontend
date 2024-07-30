import { fileURLToPath } from "url";
import createJiti from "jiti";

<<<<<<< HEAD:apps/admin/next.config.js
=======
const { ADMIN_AUTH_URL, ADMIN_USERS_URL } = process.env;

>>>>>>> 04abd4b (initial commit  users managment micro frontend):apps/admin-main/next.config.js
// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))("./src/env");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@wg-frontend/ui", "@wg-frontend/hooks"],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
<<<<<<< HEAD:apps/admin/next.config.js
=======

  // Map microfrontends to their respective paths
  rewrites: async () => {
    return [
      {
        source: "/auth",
        destination: `${ADMIN_AUTH_URL}/`,
      },
      {
        source: "/auth/:path*",
        destination: `${ADMIN_AUTH_URL}/:path*`,
      },
      {
        source: "/users",
        destination: `${ADMIN_USERS_URL}/`,
      },
    ];
  },
>>>>>>> 04abd4b (initial commit  users managment micro frontend):apps/admin-main/next.config.js
};

export default config;
