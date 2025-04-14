# Stage 1 - Build the app
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
COPY vite.config.ts ./
COPY tsconfig*.json ./
COPY postcss.config.js tailwind.config.js ./
COPY src ./src
COPY index.html ./
RUN npm install && npm run build

# Stage 2 - Serve with nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
