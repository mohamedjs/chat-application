#!/bin/sh
# Install dependencies inside the container
npm install

# Start the application
npm run dev -- -p 5000
npm run storybook