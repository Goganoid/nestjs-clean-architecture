# Specify the base image
FROM node:18.16.0-alpine3.16

# Create app directory in Docker
WORKDIR /usr/src/app

COPY .eslintrc.js .
COPY tsconfig* ./
COPY package.json ./
COPY package-lock.json ./
COPY nest-cli.json ./
RUN npm install

COPY src ./src
COPY test ./test

# Build the application
RUN npm run build

# Expose the port the app runs in
EXPOSE 6006 6007

# The command to run the application
CMD [ "npm", "run", "start:prod" ]