FROM node:lts-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --ignore-scripts

# Copy source files
COPY tsconfig.json ./
COPY src ./src
COPY .api ./.api

# Remove test files to avoid TS errors
RUN rm -rf .api/test .api/tests || true

# Build the project
RUN npm run build

# Set the entrypoint
CMD ["node", "build/index.js"]