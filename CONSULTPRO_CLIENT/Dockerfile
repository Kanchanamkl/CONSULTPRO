# Use an official Node.js runtime as the base image
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project (excluding .dockerignore files)
COPY . .

# Build the application
RUN npm run build

# Use Nginx to serve the production build
FROM nginx:alpine

# Copy build output to Nginx's web root directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
