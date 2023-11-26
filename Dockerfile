# Use the official Node.js 18 image as the base image
FROM node:18

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN yarn

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app will run on
EXPOSE 8080

# Command to run your application
CMD ["yarn", "dev"]