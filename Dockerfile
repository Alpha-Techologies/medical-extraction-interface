# 1. Use an official Node.js image as the base image
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# 4. Install dependencies
RUN npm install --frozen-lockfile

# 5. Copy the rest of the application files into the working directory
COPY . .

# 6. Build the Next.js application
RUN npm run build

# 7. Expose the port the app will run on
EXPOSE 3000

# 8. Set environment variable to use production mode
ENV NODE_ENV production

# 9. Start the Next.js app
CMD ["npm", "run", "start"]
