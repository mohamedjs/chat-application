#!/bin/sh
# Install dependencies inside the container
npm install

npm run build

# Start the application
npm run preview