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

## Tech Stack
| Layer     | Technologies              |
|-----------|--------------------------|
| Backend   | Node.js, Express.js       |
| Database  | MongoDB (via Mongoose)    |
| Frontend  | React.js, HTML, CSS, JS   |
| Auth & API| JWT, RESTful routes       |

## Getting Started
1. Clone the repo  
2. Navigate to the `backend/` folder and run:
   ```bash
   cd backend
   npm install
   npm run dev
