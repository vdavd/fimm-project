# =================================
# 1. Build stage (Vite build)
# =================================
FROM node:20 AS builder

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# =================================
# 2. Production server (Nginx)
# =================================
FROM nginx:1.25-alpine

# Copy Vite build to Nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Ensure files are readable
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
