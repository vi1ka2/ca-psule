# 🕰️ Time Capsule MERN App

A full-stack MERN application that allows users to send messages to their future selves or friends through real-time chat and scheduled “capsules.” The app also supports friend management, profile viewing, and a leveling system based on the number of capsules sent.

## ✨ Features

- **User Authentication:** Secure registration and login with JWT 🔒
- **Real-Time Chat:** Instant messaging using Socket.io 💬
- **Friend Management:** Search, send, and accept friend requests 👥
- **Scheduled Capsules:** Send messages in the future using a scheduling feature ⏰
- **Dashboard:** View your profile, current level, and upcoming scheduled capsules 📊
- **Responsive UI:** A mobile-friendly interface built with React and CSS 🎨

---

## 💻 Tech Stack & Architecture

### **Frontend**
- **React.js:** For building interactive UI components ⚛️
- **React Router:** For client-side routing 🛣️
- **Axios:** For HTTP requests to the backend 📡
- **Socket.io-client:** For real-time, bidirectional communication 🔄
- **CSS:** Custom styles and responsive design

### **Backend**
- **Node.js & Express.js:** For building RESTful API endpoints and handling server-side logic 🚀
- **MongoDB:** A NoSQL database for storing users, messages, conversations, and friend data 🗄️
- **Mongoose:** For modeling and interacting with MongoDB 📈
- **Socket.io:** For real-time chat functionality ⚡
- **Node-cron:** For scheduling future (capsule) messages ⏳
- **JWT (JSON Web Tokens):** For authentication and securing API endpoints 🔐

### **Backend Architecture Overview**
- **Authentication Module:**  
  - **Routes:** `/api/auth` for registration, login, and fetching user profiles  
  - **JWT Middleware:** Validates tokens on protected routes

- **Friend Management Module:**  
  - **Routes:** `/api/friends` for getting friend lists, sending requests, accepting/rejecting requests  
  - **FriendRequest Model:** Handles friend request statuses (pending, accepted, rejected)

- **Chat Module:**  
  - **Conversation Model:** Manages conversation data (participants, timestamps)  
  - **Message Model:** Stores individual messages (with support for scheduled messages)  
  - **Routes:** `/api/conversations` & `/api/messages`  
  - **Socket.io:** Handles real-time message exchange in conversation-specific rooms

- **Capsule Scheduler:**  
  - Uses **node-cron** to periodically check for scheduled messages that need to be delivered and broadcasts them via Socket.io

---

## 🗂️ Project Structure

Below is the project structure in plain text format for better GitHub rendering:

```
time-capsule-app/
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   │   └── landing-bg.jpg
│   │   ├── components/
│   │   │   ├── ChatPage.js
│   │   │   ├── ChatPage.css
│   │   │   ├── ChatWindow.js
│   │   │   ├── ChatWindow.css
│   │   │   ├── FriendsList.js
│   │   │   ├── FriendsList.css
│   │   │   ├── CreateCapsule.js
│   │   │   ├── CreateCapsule.css
│   │   │   ├── Profile.js
│   │   │   ├── Profile.css
|   |   |   |........................
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   └── index.js
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── capsuleController.js
│   │   ├── conversationController.js
│   │   ├── messageController.js
│   │   └── friendController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── FriendRequest.js
│   │   ├── Conversation.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── capsules.js
│   │   ├── conversations.js
│   │   ├── messages.js
│   │   ├── friends.js
│   │   └── users.js
│   ├── scheduler/
│   │   └── capsuleScheduler.js
│   ├── server.js
│   ├── package.json
│   └── .env
└── README.md
```
---

## 🌐 Deployment

- **Frontend:** Deployed React app on  **Netlify**.
- **Backend:** Deployed Node/Express server on **Render**.
- **Static Files:** In production, backend (Express) will serve the built React files from the `/client/build` folder.

---

## 📡 API Endpoints

- **Auth** (`/api/auth`)
  - `POST /register` – Register a new user.
  - `POST /login` – Log in and receive a JWT.
  - `GET /profile` – Get the authenticated user’s profile.
  
- **Friends** (`/api/friends`)
  - `GET /` – Retrieve the friend list.
  - `POST /request` – Send a friend request.
  - `POST /accept` – Accept a friend request.
  - `POST /reject` – Reject a friend request.
  
- **Conversations** (`/api/conversations`)
  - `POST /` – Create or fetch a conversation between users.
  - `GET /` – Retrieve all conversations for the user.
  
- **Messages** (`/api/messages`)
  - `GET /:conversationId` – Fetch messages for a conversation.
  - *(Socket.io is used for real-time messaging)*
  
- **Capsules** (`/api/capsules`)
  - `POST /` – Create a scheduled (future) message.
  
- **Users** (`/api/users`)
  - `GET /search` – Search for users.
  - `GET /:id` – Get user details by ID.

---

## 📸 Screenshots


- **Login Page**
- ![image](https://github.com/user-attachments/assets/dd9369ff-1507-474c-b3fa-c20f3784ab1e)

- **Dashboard**
- ![image](https://github.com/user-attachments/assets/6e509ddf-f093-4895-ae68-a76c6812df8d)

- **Chat Interface**
![image](https://github.com/user-attachments/assets/83960313-165b-4f65-be5a-9f60b1ef46ca)
---

## 📝 License

This project is licensed under the [MIT License]

##Link
https://timecapsulee.netlify.app



