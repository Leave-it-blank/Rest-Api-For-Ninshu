FROM node:18

# Create app directory
WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig.json ./


RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
RUN ls -a
EXPOSE 6060
 
CMD ["npm","run","dev"]