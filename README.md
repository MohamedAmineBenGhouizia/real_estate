# RealEstate App

A modern, full-stack real estate application built with React, Node.js, Express, and PostgreSQL.

## Features

### Client-Side
- **Modern UI/UX**: Built with Material-UI v5 for a premium look and feel.
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop.
- **Property Browsing**: Advanced search and filtering (price, type, etc.).
- **Property Details**: Image galleries, detailed info, and location.
- **Reservations**: User-friendly booking system with date selection and price calculation.
- **User Dashboard**: Manage personal reservations and profile.
- **Authentication**: Secure login and registration with JWT.

### Admin-Side
- **Dashboard**: Overview of key metrics (properties, users, revenue).
- **Property Management**: Create, edit, and delete property listings with image uploads.
- **Reservation Management**: View and update reservation statuses (confirm/cancel).
- **Invoice Management**: Track payments and invoices.
- **User Management**: Manage user roles and accounts.

## Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Material-UI (MUI) v5, Emotion
- **State Management**: React Context API
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Animations**: Framer Motion

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JSON Web Tokens (JWT), Bcrypt
- **Validation**: Joi
- **File Uploads**: Multer, Cloudinary
- **Security**: Helmet, CORS, Rate Limiting

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- PostgreSQL
- Cloudinary Account (for image uploads)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MohamedAmineBenGhouizia/real_estate.git
    cd real_estate
    ```

2.  **Backend Setup:**
    ```bash
    cd server
    npm install
    ```
    - Create a `.env` file in the `server` directory based on `.env.example` (or use the provided configuration).
    - Update database credentials and Cloudinary keys.
    - Run the database creation script (if applicable) or let Sequelize sync.
    ```bash
    # Start the server
    npm run dev
    ```

3.  **Frontend Setup:**
    ```bash
    cd client
    npm install
    ```
    - Create a `.env.local` file if needed for environment variables (e.g., `VITE_API_BASE_URL`).
    ```bash
    # Start the client
    npm run dev
    ```

4.  **Access the App:**
    - Frontend: `http://localhost:5173`
    - Backend API: `http://localhost:5000`

## API Documentation

See `server/docs/API.md` (Coming soon) for detailed API endpoints and usage.

## License

ISC
