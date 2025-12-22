########### 1) Base image for installing deps ###########
FROM node:20-alpine AS deps
WORKDIR /app

# Install OS deps if needed
RUN apk add --no-cache libc6-compat

# Copy only package files first (better caching)
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install dependencies (prefer lockfiles for reproducibility)
RUN \
	if [ -f package-lock.json ]; then npm ci; \
	elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
	elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm install --frozen-lockfile; \
	else npm install; \
	fi

########### 2) Builder stage (Vite build) ###########
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the production assets
# Pass Vite envs at build time (populated via --build-arg)
ARG VITE_BACKEND_URL
ARG VITE_CLOUD_NAME
ARG VITE_UPLOAD_PRESET
ARG VITE_GOOGLE_CLIENT_ID
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL \
	VITE_CLOUD_NAME=$VITE_CLOUD_NAME \
	VITE_UPLOAD_PRESET=$VITE_UPLOAD_PRESET \
	VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID

RUN npm run build

########### 3) Runtime image (nginx, non-root) ###########
FROM node:20-alpine AS runner
WORKDIR /app

# Configure port to 5173
ENV PORT=5173

# Copy built assets
COPY --from=builder /app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodegroup && \
	adduser -u 1001 -D -S -G nodegroup nodeuser

# Install a lightweight static server as root, then fix permissions
RUN npm install -g serve && \
	chown -R nodeuser:nodegroup /usr/local/lib/node_modules /usr/local/bin
USER nodeuser

EXPOSE 5173

# Serve the built app
CMD ["serve", "-s", "dist", "-l", "5173"]
