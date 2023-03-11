From node:current-alpine3.16 as base

# Create app directory
WORKDIR /usr/src

# Install app dependencies
COPY package*.json ./

# Expose port 3000
EXPOSE 3000


FROM base as production

# Set environment to production
ENV NODE_ENV=production
# Install production dependencies
RUN npm ci --only=production
# Copy app source code
COPY app app
# Start app in production mode
CMD [ "node", "./app/server.js" ]


FROM base as development

# Set environment to development
ENV NODE_ENV=development
# Install development dependencies
RUN npm install -g nodemon && npm install
# Copy app source code
COPY  app app
#  Start app in development mode
CMD [ "nodemon", "./app/server.js" ]
