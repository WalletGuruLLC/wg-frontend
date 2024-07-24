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
packages
  ├─ ui
  |   └─ Start of a UI package for the webapp using tailwind
  └─ hooks
      └─ Start of a hooks package for shared logic
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

> In this template, we use `@wg-frontend` as a placeholder for package names. As a user, you might want to replace it with your own organization or project name. You can use find-and-replace to change all the instances of `@wg-frontend` to something like `@my-company` or `@project-name`.

## Quick Start

To get it running, follow the steps below:

### 1. Setup dependencies

```bash
# Install dependencies
pnpm i

# Configure environment variables
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env
# See the package.json for the required port number of each frontend
```
