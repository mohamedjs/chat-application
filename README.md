# Chat Application – Full-Stack Real-Time Messaging Platform

A modern, scalable chat application featuring real-time messaging, authentication, media sharing, and video calls. Built with a Laravel (PHP) backend, React frontend, Node.js socket server, MySQL, Redis, and Dockerized DevOps for easy deployment.

---

## 🏗️ Architecture Overview

- **Backend:** Laravel (PHP), RESTful API, Sanctum authentication, modular controllers/services, event-driven jobs, Redis queue
- **Frontend:** React (SPA), modular components, video/audio call UI, responsive design, QuickBlox integration
- **Socket Server:** Node.js, real-time WebSocket communication for chat and calls
- **Database:** MySQL (with seeders/factories), Redis for caching and queues
- **DevOps:** Docker Compose, Nginx, PHP-FPM, Supervisor, environment configs, healthchecks

---

## 🚀 Features

- **User Authentication:** Phone-based login, verification code, profile completion, image upload
- **Chat Rooms:** List, join, and manage chat rooms; direct and group messaging
- **Real-Time Messaging:** Text and file messages, instant delivery via WebSockets
- **Media & File Sharing:** Upload and send images/files in chat
- **Video/Audio Calls:** Integrated call UI (QuickBlox), call notifications, accept/reject
- **Notifications:** Real-time events (Laravel Echo, Redis, Node.js socket server)
- **Admin & API:** Modular API routes, request validation, resource collections
- **Testing:** Factories, seeders, and test utilities for backend

---

## 📁 Project Structure

- `docker-compose.yml` – Multi-service orchestration (nginx, php, redis, socket-server, reactjs, db, phpmyadmin)
- `devops/` – Dockerfiles, Nginx configs, PHP-FPM, MySQL, Redis, Supervisor, logs, hosts
- `pro-chat-backend/`
  - `app/` – Laravel backend (Controllers, Services, Events, Jobs, Models, Middleware, Providers)
  - `routes/api.php` – API endpoints for auth, chat, rooms
  - `database/` – Migrations, factories, seeders
- `pro-chat/`
  - `src/` – React SPA (components, views, store, helpers, styles)
- `socket-server/` – Node.js WebSocket server for real-time events

---

## 🛠️ Technologies Used

- **Backend:** PHP 8, Laravel, Sanctum, Redis, MySQL
- **Frontend:** React, Material UI, QuickBlox, WebRTC
- **Real-Time:** Node.js, WebSockets, Laravel Echo
- **DevOps:** Docker, Docker Compose, Nginx, PHP-FPM, Supervisor
- **Other:** PHPMyAdmin, environment variable configs, healthchecks

---

## 🔌 API Overview

- `POST /api/v1/login` – User login (phone)
- `POST /api/v1/verify` – Verify code
- `POST /api/v1/complete-profile` – Complete user profile
- `POST /api/v1/upload-image` – Upload user image
- `GET /api/v1/rooms` – List chat rooms
- `GET /api/v1/rooms/{id}` – Get room details
- `POST /api/v1/chats` – Send message

---

## ⚡ Real-Time Events

- **MessageEvent:** Broadcasts new chat messages
- **SmsEvent:** Broadcasts SMS/verification events
- **Socket Server:** Handles WebSocket connections for chat and calls

---

## 🐳 How to Run (Docker Compose)

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd chat-application
   ```
2. **Copy and edit environment variables:**
   - Set up `.env` files for backend, frontend, and socket-server as needed
3. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```
4. **Access the app:**
   - Frontend: [http://localhost:5000](http://localhost:5000)
   - Backend API: [http://localhost/api/v1](http://localhost/api/v1)
   - PHPMyAdmin: [http://localhost:9090](http://localhost:9090)
   - Socket server: [http://localhost:6001](http://localhost:6001)

---

## 📝 Development Notes

- **Nginx** serves both backend and frontend, with custom configs for each app
- **Supervisor** manages Laravel queue workers for jobs/events
- **Redis** is used for both caching and broadcasting events
- **MySQL** is the main database, with seeders/factories for test data
- **React SPA** connects to backend API and socket server for real-time features
- **Node.js socket server** enables instant chat and call notifications

---

## 📚 Further Reading

- See `devops/` for Docker, Nginx, and PHP-FPM configuration
- See `pro-chat-backend/app/` for backend logic and API
- See `pro-chat/src/` for frontend components and UI
- See `socket-server/` for real-time server code

---

## 👤 Author
- Mohamed Mamoud ([mohamedjs](https://github.com/mohamedjs))
- Email: mohammed_hs55@yahoo.com
