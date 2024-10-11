# Stage 1: Build the React app
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy the rest of the app's source code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the React app using a lightweight web server
FROM nginx:alpine

# Copy the built React app from the previous stage to the Nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
