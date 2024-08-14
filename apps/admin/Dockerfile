FROM node:20-alpine AS base

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
RUN npm install -g turbo@^2.0.9
COPY . .
RUN turbo prune @wg-frontend/admin --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN npm install -g pnpm@^9.1.1
RUN pnpm install



# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm -F admin build

FROM base AS runner

# Add the environment variables needed
ARG NEXT_PUBLIC_ADMIN_BASE_URL
ENV NEXT_PUBLIC_ADMIN_BASE_URL=$NEXT_PUBLIC_ADMIN_BASE_URL

ARG NEXT_PUBLIC_AUTH_MICROSERVICE_URL
ENV NEXT_PUBLIC_AUTH_MICROSERVICE_URL=$NEXT_PUBLIC_AUTH_MICROSERVICE_URL

ARG NEXT_PUBLIC_NOTIFICATION_MICROSERVICE_URL
ENV NEXT_PUBLIC_NOTIFICATION_MICROSERVICE_URL=$NEXT_PUBLIC_NOTIFICATION_MICROSERVICE_URL

WORKDIR /app

# Don't run production as root
RUN npm install -g pnpm@^9.1.1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/ ./

EXPOSE 3000

CMD ["pnpm", "-F", "admin", "start"]