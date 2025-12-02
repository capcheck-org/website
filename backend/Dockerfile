FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies (no lock file since we use npm workspaces at root level)
COPY package.json ./
RUN npm install --omit=dev

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
# Set admin backend URL at build time so admin panel knows where to make API calls
ENV STRAPI_ADMIN_BACKEND_URL=https://capcheck.org
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 strapi

# Copy everything needed for Strapi production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/database ./database
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/favicon.png ./favicon.png

# Fix permissions for strapi user
RUN chown -R strapi:nodejs /app

USER strapi

EXPOSE 1337

ENV HOST=0.0.0.0
ENV PORT=1337

CMD ["npm", "run", "start"]
