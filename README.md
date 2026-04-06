<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2&height=200&section=header&text=🌊%20RiverFlow&fontSize=48&fontColor=fff&animation=fadeIn" width="100%"/>

</div>

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-23.0-F02E65?style=for-the-badge&logo=appwrite&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5.0-000000?style=for-the-badge&logo=npm&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)

</div>

<div align="center">

[![Live Demo](https://img.shields.io/badge/🔗_Live_Demo-Vercel-00D9FF?style=for-the-badge&logo=vercel)](https://river-flow-nine.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/Alok-Pandey-Coder/RiverFlow)

</div>

<br/>

---

## 📖 Overview

**RiverFlow** is a modern, full-stack Q&A platform designed for community knowledge sharing and collaboration. Built with cutting-edge web technologies, it enables users to ask questions, receive answers, vote, comment, and organize content through tags—all with a sleek, responsive user interface.

Powered by **Next.js 16**, **React 19**, and **Appwrite**, RiverFlow delivers a production-ready experience deployed on **Vercel**.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **User Authentication** | Secure login and registration with Appwrite |
| ❓ **Ask Questions** | Post detailed questions with markdown support |
| 💡 **Provide Answers** | Community members can contribute solutions |
| 👍 **Voting System** | Upvote/downvote questions and answers |
| 💬 **Comments** | Discuss and add context to Q&A |
| 🏷️ **Tagging** | Organize content with flexible tagging system |
| 👤 **User Profiles** | Personalized profiles with activity history |
| 🎨 **Dark/Light Mode** | Beautiful UI with Shadcn components |
| ⚡ **Real-time Updates** | Instant feedback with Zustand state management |
| 📱 **Responsive Design** | Works seamlessly on all devices |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Runtime** | Node.js | JavaScript runtime |
| **Framework** | Next.js 16 | React framework with SSR |
| **Frontend** | React 19 | UI library |
| **Language** | TypeScript | Type-safe development |
| **Styling** | Tailwind CSS 4 | Utility-first CSS |
| **UI Components** | Shadcn/UI | Pre-built React components |
| **State Management** | Zustand 5 | Lightweight state management |
| **Backend** | Appwrite | BaaS platform |
| **Animations** | Framer Motion | Smooth animations |
| **Text Editor** | React MD Editor | Markdown editing |
| **Icons** | Lucide React | Clean icon library |

---

## 🎯 Key Technologies

<div align="center">

### Frontend Stack
```
Next.js 16 → React 19 → TypeScript → Tailwind CSS 4 → Shadcn/UI
```

### State & Features
```
Zustand → Framer Motion → React MD Editor → Lucide Icons
```

### Backend
```
Appwrite BaaS → Cloud Storage → Real-time Database
```

</div>

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Alok-Pandey-Coder/RiverFlow.git
cd RiverFlow
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file:
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_API_KEY=your_api_key
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # Reusable React components
│   ├── ui/                # Shadcn UI components
│   └── ...                # Custom components
├── lib/                    # Utility functions & helpers
├── models/                 # Data models & schemas
├── store/                  # Zustand state management
├── utils/                  # Helper functions
└── proxy.ts               # Appwrite proxy configuration
```

---

## 🎨 UI/UX Features

- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Dark Mode Support** - Eye-friendly dark theme
- ✅ **Smooth Animations** - Powered by Framer Motion
- ✅ **Markdown Support** - Rich text editing
- ✅ **Icon Integration** - Professional Lucide React icons
- ✅ **Accessible** - WCAG compliant components

---

## 🔧 Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint

# TypeScript
npm run typecheck   # Type checking
```

---

## 📦 Core Dependencies

```json
{
  "next": "16.2.0",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "typescript": "^5",
  "tailwindcss": "^4",
  "@tabler/icons-react": "^3.41.0",
  "lucide-react": "^1.7.0",
  "framer-motion": "^12.38.0",
  "zustand": "^5.0.12",
  "appwrite": "^23.0.0",
  "@uiw/react-md-editor": "^4.1.0",
  "shadcn": "^4.1.1"
}
```

---

## 🌐 Deployment

The application is deployed on **Vercel** for optimal performance:

[![Live Demo](https://img.shields.io/badge/🔗_Visit_Live_Demo-Vercel-00D9FF?style=for-the-badge&logo=vercel)](https://river-flow-nine.vercel.app)

---

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/AmazingFeature

# 3. Commit your changes
git commit -m "Add amazing feature"

# 4. Push to the branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request
```

---

## 📋 Roadmap

- [ ] Advanced search & filtering
- [ ] Notification system
- [ ] User reputation system
- [ ] Gamification (badges, achievements)
- [ ] Social sharing features
- [ ] Mobile app (React Native)

---

## 🔐 Security

- Appwrite handles authentication & authorization
- TypeScript ensures type safety
- Environment variables for sensitive data
- CORS configuration for secure API calls

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` file for details.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2&height=100&section=footer" width="100%"/>

**Built with ❤️ by [Alok Kumar Pandey](https://github.com/Alok-Pandey-Coder)**

⭐ **If you found this project helpful, please give it a star!**

[Live Demo](https://river-flow-nine.vercel.app) • [GitHub](https://github.com/Alok-Pandey-Coder/RiverFlow) • [Issues](https://github.com/Alok-Pandey-Coder/RiverFlow/issues)

</div>