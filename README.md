# wg-frontend

## About

It uses [Turborepo](https://turborepo.org) and contains:

```text
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ <app>-main
  |   └─ Next.js app that maps every microfrontend to its correspondant url
  ├─ <app>-<microfronted>
  |   └─ Next.js app that serves a specific microfrontend
  └─ more...
packages
  ├─ ui
  |   └─ Start of a UI package for the webapp using tailwind
  ├─ hooks
  |   └─ Start of a hooks package for shared logic
  └─ more...
tooling
  ├─ eslint
  |   └─ shared, fine-grained, eslint presets
  ├─ prettier
  |   └─ shared prettier configuration
  ├─ tailwind
  |   └─ shared tailwind configuration
  └─ typescript
      └─ shared tsconfig you can extend from
```

## Quick Start

To get it running, follow the steps below:

```bash
# Install dependencies
pnpm i

# Configure environment variables
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env
# See the package.json for the required port number of each frontend

# Start the development server for all apps (main and microfrontends)
pnpm dev
```

> **Note:** If you want to run a specific app, you can use `pnpm -F <app> dev` where `<app>` is the name of the app you want to run.

## Deployment

Each app can be deployed independently and without any restriction for the technology or the deployment platform. You can use Vercel, Netlify, AWS, or any other platform you prefer.

## FAQ

### How to add a microfrontend

1. Copy one of the example apps located in `base-apps` and paste it into the `apps` directory.
2. Rename the `package.json` name and the folder to `<app>-<microfrontend>`.
3. Update the port number in the `dev` and `start` scripts in the `package.json` to a unique one. (e.g. `3001`, see other apps for reference)
4. Update the `<app>-main` app to include the new microfrontend in the `next.config.js` file.
5. Create the env variables in the `.env`, the `.env.example` and the `turbo.json` file for the new microfrontend.
6. Run `pnpm dev` and navigate to the new microfrontend to see it running.

### Other technologies

1. Eslint
   - The project uses a shared eslint configuration located in the `tooling/eslint` directory.
   - The configuration is basically the default eslint config with some additional rules specific to react.
   - The configuration is shared across all packages and apps.
2. Prettier
   - The project uses a shared prettier configuration located in the `tooling/prettier` directory.
   - The configuration is basically the default prettier config with some additional rules specific to tailwind.
   - The configuration is shared across all packages and apps.
