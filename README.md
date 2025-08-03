# FYP‑online‑job‑portal

A full-stack job portal web application developed as a Final Year Project.

## Project Overview
Built on the **MERN stack**, this application offers secure authentication (Role-based: Admin, Recruiter, Job Seeker), RESTful APIs, and React-based UI for posting, viewing, applying to jobs, and managing profiles.

## Features
- **Authentication & Authorization** with JWT (login sessions, role-based access)
- **Job Listings** creation by recruiters; searchable and filterable for seekers
- **Application Workflow** – job seekers can apply with CV/SOP; recruiters manage applications
- **Admin Panel** – oversee users, jobs, departments, and analytics dashboards (if implemented)
- Responsive UI design for desktop and mobile
Live Video Interviews (WebRTC-Based)** – Schedule and start peer-to-peer video sessions directly within the portal. No third-party links or switching tabs; built using React, WebRTC, and Socket.io / Peer.js  
  - Host/join meeting within `VideoMeeting.jsx`  
  - Camera, mic mute/unmute, hang-up buttons  
  - `peerService.js` and `WebRTCService.js` manage signaling, ICE, and stream negotiation

- **Real-Time Notifications & Messaging** – Admin & recruiters notified when a candidate joins the interview room

## 🧰 Tech Stack

| Layer      | Technology                   |
|------------|------------------------------|
| Frontend   | React, JavaScript, HTML, CSS |
| Backend    | Node.js, Express.js          |
| Database   | MongoDB (via Mongoose)       |
| Real-Time  | WebRTC + Peer.js / Socket.io |
| Auth       | JWT (Role-based access)      |


## Getting Started
1. Clone the repo  
2. Navigate to the `backend/` folder and run:
   ```bash
   cd backend
   npm install
   npm run dev
