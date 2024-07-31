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

The default deployment is done using Docker. You can use the already configured Dockerfiles in each app to build and run the app on any platform that supports Docker. Replace <app> for the name of the app you want to deploy.

> **Important**: Some apps validate the environment variables at runtime AND at build time, so make sure to provide the required environment variables when running the Docker image AND when building the image.

```bash
# Build the Docker image
docker build -f apps/<app>/Dockerfile . --no-cache --build-arg <EXAMPLE_ENV_VAR1>=<VAR_VALUE1> --build-arg <EXAMPLE_ENV_VAR2>=<VAR_VALUE2> -t <app>

# Run the Docker image
docker run -p 3000:3000 <app>
```

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
