#!/bin/sh

# Install dependencies inside the container
npm install --legacy-peer-deps

# Start Storybook in the background
npm run storybook -- --port 6006 --ci &

# Start Next.js in the background
npm run dev -- -p 5000 &

# Wait for both servers to be ready
sleep 10

# Run Playwright tests
npx playwright test

# Keep the container running
wait