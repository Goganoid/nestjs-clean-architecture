# Specify the base image
FROM node:18.16.0-alpine3.16

# Create app directory in Docker
WORKDIR /usr/src/app

COPY .eslintrc.js .
COPY tsconfig* ./
COPY package.json ./
COPY yarn.lock ./
COPY nest-cli.json ./
# If you are using yarn
RUN yarn install --ignore-engines

COPY src ./src
COPY test ./test

# Build the application
RUN yarn build

# Expose the port the app runs in
EXPOSE 6006

# The command to run the application
CMD [ "yarn", "start:prod" ]