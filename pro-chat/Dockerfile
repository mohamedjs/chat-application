# Build stage
FROM node:20-alpine as build
WORKDIR /var/www/html/site
COPY package*.json ./
RUN npm i
COPY . .
# RUN npm run build

EXPOSE 5000
CMD ["npm", "run", "dev"]
