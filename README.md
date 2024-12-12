# UEPMS

**University Exam Paper Management System**

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [License](#license)

---

## Introduction
**University Exam Paper managment System** is a comprehensive system for managing university exam question papers. It streamlines the process of creating, organizing, and distributing exam papers, ensuring a seamless experience for administrators, faculty, and other stakeholders.

---

## Features
- **Role-based Access:** Different roles for administrators, faculty, and exam coordinators.
- **Question Bank:** Store and manage a repository of questions.
- **Exam Paper Generation:** Automated generation of question papers based on defined patterns.
- **Secure Access:** Role-based authentication and authorization.
- **History and Logs:** Track changes and updates made to the question papers.
- **PDF Generation:** Export exam papers as PDFs.

---

## Tech Stack
- **Frontend:** React, Next.js, Tailwind CSS
- **Backend:** Node.js, Express.js, Next.js API Routes
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JWT with role management

---

## Installation

### Prerequisites
- Node.js (>= 16.x)
- MongoDB
- Git

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/AyanPaL7876/UEPMS
   cd question-master
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   NEXT_PUBLIC_API_URL=your-api-url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Usage

### Running Locally
1. Ensure MongoDB is running.
2. Navigate to the project directory.
3. Run the following commands to start the app:
   ```bash
   npm run dev
   ```
4. Open your browser and visit `http://localhost:3000`.


---


