# Ayurbot - Ayurvedic Prakriti Identification System

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green)](https://www.mongodb.com/)

Ayurbot is a web application that helps users identify their Ayurvedic Prakriti (body constitution) through a carefully designed questionnaire. Based on ancient Ayurvedic principles, the system analyzes user responses to determine their dominant dosha (Vata, Pitta, or Kapha) and provides personalized recommendations.

![Ayurbot Screenshot](/public/assets/img/screenshot.png) <!-- Add actual screenshot path -->

## Features

- **User Authentication**
  - Secure login/signup with bcrypt password hashing
  - Session-based authentication
  - Dual login using email or username
  
- **Prakriti Assessment**
  - Interactive questionnaire with dynamic questions
  - Dosha score calculation algorithm
  - Detailed result analysis (Vata/Pitta/Kapha)
  
- **User Dashboard**
  - Test history tracking
  - Personalized recommendations
  - Profile management

- **Educational Resources**
  - Detailed dosha descriptions
  - Lifestyle recommendations
  - Dietary guidelines

## Technology Stack

**Frontend**
- EJS Templating Engine
- Bootstrap 5
- CSS3
- JavaScript

**Backend**
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)

**Authentication**
- Express Session
- BcryptJS

**Development Tools**
- Nodemon (Development server)

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local instance or Atlas URI)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ayurbot.git
   cd ayurbot

2. **Install dependencies**
   ```bash
   npm install

3. **Set up environment variables**
    Create .env file in root directory:
   ```bash
   MONGODB_URI=mongodb://localhost:27017/ayurbot
   SESSION_SECRET=your_session_secret_key

4. **Start the development server**
   ```bash
   npm run dev

5. **Access the application:**
    ```bash
    Open http://localhost:3000 in your browser

**Project Structure**
```bash
    ayurbot/
├── models/              # MongoDB schema models
│   ├── User.js
│   └── PrakritiResult.js
├── routes/              # Express routers
│   ├── auth.js
│   └── prakriti.js
├── views/               # EJS templates
│   ├── partials/        # Reusable components
│   ├── auth/            # Authentication pages
│   └── results/         # Dosha result pages
├── public/              # Static assets
│   ├── assets/
│   │   ├── css/        # Stylesheets
│   │   ├── js/         # Client-side scripts
│   │   └── img/        # Images
├── app.js               # Main application file
└── package.json
```

**License**
```
This project is licensed under the MIT License - see the LICENSE file for details.
```
**Acknowledgments**
Ayurvedic principles from classical texts

Bootstrap template inspiration

Node.js community resources

**Contact**
For support or inquiries:
Email: support@ayurbot.com
GitHub: @yourusername
