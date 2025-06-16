# 1. Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Cài dependencies
COPY package*.json ./
RUN npm install

# Copy source và build
COPY . .
RUN npm run build

# 2. Production stage
FROM node:18-alpine AS runner
WORKDIR /app

# Chỉ copy folder build và node_modules cần thiết
# Copy package.json & package-lock.json
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

# Copy node_modules, build output, public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Nếu có next.config.ts:
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000

# Chạy Next.js in production mode
CMD ["npm", "run", "start"]