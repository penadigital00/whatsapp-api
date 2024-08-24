# Use the official Node.js Alpine image as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Install Chromium
ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true" \
    NODE_ENV="production"
RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    udev \
    ttf-freefont \
    chromium \
    git

COPY .env ./

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
#RUN npm ci --only=production --ignore-scripts
#RUN npm install
RUN npm install --only=production

# Copy the rest of the source code to the working directory
COPY . .

#run migration
CMD ["node", "src/migration.js"]

#run seeder
CMD ["node", "src/seeder.js"]

# Expose the port the API will run on
EXPOSE 3000

# Start the API
CMD ["npm", "start", "run"]
