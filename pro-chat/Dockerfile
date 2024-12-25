# Build stage
FROM node:20-alpine as build
WORKDIR /var/www/html/site
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 5000
CMD ["npm", "run", "preview"]
