# Use official Node image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files first to install dependencies
COPY package.json package-lock.json ./

# Install all dependencies (this includes vite)
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Expose frontend port
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]