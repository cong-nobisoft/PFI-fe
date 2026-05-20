# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies needed for building
RUN apk add --no-cache libc6-compat

# Copy package files and project.inlang (needed for postinstall script)
COPY package.json yarn.lock ./
COPY project.inlang ./project.inlang

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM nginx:alpine AS production

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration (optional - for SPA routing)
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    # Gzip compression \
    gzip on; \
    gzip_vary on; \
    gzip_min_length 1024; \
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript; \
}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

