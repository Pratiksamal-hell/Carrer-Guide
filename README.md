# Career Guide

Career Guide is an AI-powered full-stack web application designed to help users build personalized learning paths for their dream careers. By leveraging advanced AI models and external APIs, the platform generates structured career roadmaps tailored to a user’s goals and experience level.

Users can sign up, log in, generate intelligent career plans, track learning progress, save roadmaps, and access curated learning resources including YouTube tutorials, projects, and recommended skills.

---

##  Features

###  User Features

* User registration and secure login system
* Personalized AI-generated career roadmaps
* Skill-based and phase-wise learning plans
* Learning progress tracking
* Save and manage multiple roadmaps
* Responsive modern UI optimized for all devices

###  AI-Powered Roadmap Generation

* Dynamic roadmap generation using AI models
* Personalized career paths based on:

  * Career goal
  * Current skill level
  * Learning progression
* Structured learning phases with:

  * Skills
  * Durations
  * Projects
  * Resources
  * Milestones

###  Smart Learning Resource Integration

* Automatic YouTube tutorial recommendations
* AI-curated learning resources
* Cached video results for improved performance
* Intelligent content mapping based on roadmap skills

###  Authentication & Security

* Secure password hashing with bcrypt
* Protected authentication system
* Secure API communication

---

##  Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### AI & APIs

* OpenRouter AI API
* Large Language Models (LLMs)
* YouTube Data API
* REST API Architecture

### Authentication

* bcrypt password hashing

---

##  AI & API Integrations

The platform uses AI and external APIs to deliver intelligent and scalable functionality.

###  OpenRouter AI Integration

Career Guide leverages the OpenRouter AI API to:

* Generate personalized career roadmaps
* Create structured learning phases
* Recommend projects and skills
* Adapt roadmap complexity based on user experience

###  YouTube Data API

The YouTube API is used to:

* Fetch relevant tutorial videos
* Recommend learning content dynamically
* Improve learning accessibility for users

###  Intelligent System Design

* Cached API responses for performance optimization
* Modular AI architecture for future AI model upgrades
* Scalable backend API structure

---

##  Project Structure

```bash
Career-Guide/
│
├── Backend/              # Express API & backend logic
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── services/
│   └── server.js
│
├── frontend/             # React + Vite frontend
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── assets/
│
└── README.md
```

---

## ⚙️ Getting Started

## 1️ Clone the Repository

```bash
git clone https://github.com/Pratiksamal-hell/Carrer-Guide.git
cd Carrer-Guide
```

---

## 2️ Backend Setup

```bash
cd Backend
npm install
npm start
```

### Create a `.env` file inside `Backend/`

```env
MONGO_URI=your_mongodb_connection_string
OPENROUTER_API_KEY=your_openrouter_api_key
YOUTUBE_API_KEY=your_youtube_api_key
PORT=5000
```

---

## 3️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs using Vite and connects to the backend API at:

```bash
http://localhost:5000
```

---

##  API Overview

### Authentication

* `POST /signup` → Create a new user account
* `POST /login` → Authenticate existing users

### AI Roadmaps

* `POST /generate-roadmap` → Generate AI-powered career roadmap
* `POST /save-roadmap` → Save generated roadmap
* `GET /my-roadmaps/:userId` → Fetch user saved roadmaps
* `PUT /roadmap/progress/:id` → Update roadmap progress

---



---

##  System Highlights

* Full-stack MERN architecture
* AI-driven personalized learning system
* RESTful API design
* Scalable modular backend
* Responsive modern UI/UX
* Optimized API caching for performance

---

##  Developer

Developed by **Pratik Kumar Samal**

GitHub: [Pratik Samal GitHub](https://github.com/Pratiksamal-hell?utm_source=chatgpt.com)

---


