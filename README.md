# Login/Register Project

This project is a full-stack application for user registration and login functionality. It includes both frontend and backend components, with features like password validation, rate limiting, and token-based authentication.

## Table of Contents
- [Dependencies](#dependencies)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Features](#features)

## Dependencies

### Frontend

- `@ant-design/charts`: ^2.2.1
- `@ant-design/icons`: ^5.4.0
- `@ant-design/plots`: ^2.3.2
- `@testing-library/jest-dom`: ^5.17.0
- `@testing-library/react`: ^13.4.0
- `@testing-library/user-event`: ^13.5.0
- `antd`: ^5.20.6
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `react-router-dom`: ^6.26.2
- `react-scripts`: 5.0.1
- `web-vitals`: ^2.1.4

### Backend

- `bcrypt`: ^5.1.1
- `cors`: ^2.8.5
- `dotenv`: ^16.4.5
- `express`: ^4.21.0
- `express-rate-limit`: ^7.4.0
- `express-validator`: ^7.2.0
- `helmet`: ^7.1.0
- `jsonwebtoken`: ^9.0.2
- `morgan`: ^1.10.0
- `pg`: ^8.12.0
- `sequelize`: ^6.37.3

## Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>

2. **Install dependencies for both frontend and backend:**
   - Frontend
     ```bash
     cd frontend
		 npm install
     
   - Backend
     ```bash
     cd backend
		 npm install

**Running the Application**
To start the application, you need to run both the frontend and backend servers. Open two terminal windows or tabs and execute the following commands:
- In the first terminal (for the backend):
  	```bash
   cd backend
	 npm start

- In the second terminal (for the frontend):
   ```bash
   cd frontend
	 npm start

**Environment Variables**
- The backend requires a .env file in the backend directory with the following variables:
	```makefile
	   DB_PORT=<your-database-port>
		 DB_HOST=<your-database-host>
		 DB_USER=<your-database-user>
		 DB_NAME=<your-database-name>
		 DB_PASSWORD=<your-database-password>
		 JWT_SECRET_KEY=<your-jwt-secret-key>
		 JWT_REFRESH_SECRET_KEY=<your-jwt-refresh-secret-key>

Ensure you replace the placeholder values with your actual configuration.

Features
	- Password Validation: Includes validation for password strength and confirmation.
 	- Rate Limiting: Limits the number of requests to protect against abuse.
	- Token-Based Authentication: Utilizes JWT for secure authentication and authorization.
For more details on how to use the application, refer to the documentation for the frontend and backend components.
