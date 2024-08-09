# wg-frontend

## About

It uses [Turborepo](https://turborepo.org) and contains:

```text
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ admin
  |   └─ Next.js app that serves the admin webapp
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

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) `v20.15`
- [pnpm](https://pnpm.io/installation) `v9.1.1`
- (Optional) [Docker](https://docs.docker.com/get-docker/) `v27 or higher`

## Quick Start

To get it running, follow the steps below:

```bash
# Install dependencies
pnpm i

# Configure environment variables
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Start the development server for all apps
pnpm dev
```

> **Note:** If you want to run a specific app, you can use `pnpm -F <app> dev` where `<app>` is the name of the app you want to run.

## Deployment

Each app can be deployed independently and without any restriction for the technology or the deployment platform. You can use Vercel, Netlify, AWS, or any other platform you prefer.

## FAQ

### Other technologies

1. Eslint
   - The project uses a shared eslint configuration located in the `tooling/eslint` directory.
   - The configuration is basically the default eslint config with some additional rules specific to react.
   - The configuration is shared across all packages and apps.
2. Prettier
   - The project uses a shared prettier configuration located in the `tooling/prettier` directory.
   - The configuration is basically the default prettier config with some additional rules specific to tailwind.
   - The configuration is shared across all packages and apps.
