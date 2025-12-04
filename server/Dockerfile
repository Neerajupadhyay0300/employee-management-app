FROM node:20-slim AS builder
WORKDIR /app

# Build arg to support monorepo root context and server subdir context
ARG SERVER_DIR=server

RUN apt-get update -y && apt-get install -y openssl

COPY ${SERVER_DIR}/package*.json ./
RUN npm ci --ignore-scripts

COPY ${SERVER_DIR}/src ./src
COPY ${SERVER_DIR}/tsconfig.json ./
COPY ${SERVER_DIR}/src/prisma ./src/prisma

RUN npx prisma generate --schema src/prisma/schema.prisma
RUN npx tsc

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

ARG SERVER_DIR=server
RUN apt-get update -y && apt-get install -y openssl
COPY ${SERVER_DIR}/package*.json ./
RUN npm ci --omit=dev --ignore-scripts

COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma
COPY --from=builder /app/node_modules/@prisma/client /app/node_modules/@prisma/client
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/dist /app/dist

EXPOSE 4000
CMD ["node", "dist/index.js"]
