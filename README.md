# MERN Authentication Todo App

## Description
This project is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It features user authentication and a todo list functionality, allowing users to create accounts, log in, and manage their personal todo items.

## Features
- User Registration and Authentication
- Secure password hashing
- JSON Web Token (JWT) for session management
- CRUD operations for todo items
- Responsive design for mobile and desktop

## Technologies Used
- **MongoDB**: Database
- **Express.js**: Backend framework
- **React.js**: Frontend library
- **Node.js**: Runtime environment
- **Redux**: State management (if used)
- **JWT**: Authentication
- **Bcrypt**: Password hashing

## Installation

### 1. Clone the repository:
  ```bash
  git clone https://github.com/yourusername/mern-authentication-todo-app.git
  cd mern-authentication-todo-app
  ```

### 2. Set up the Backend (Node.js/Express):
#### 1. Navigate to the backend folder:
  ```bash
  cd server
  ```
#### 2. Install dependencies:
  ```bash
  npm install
  ```
#### 3. Create a .env file for environment variables:
  ```bash
  npm install dotenv
  ```
Add the following to .env (replace with your own values):
  ```bash
  USERNAME=exampleUser
  PASSWORD=examplePass123
  DATABASE=MyDatabase
  PORT=5000
  SECERT=mySecretKey
  ```
#### 4. Start the backend server:
  ```bash
  npm start
  ```
The backend should now be running at http://localhost:5000.

### 3. Set up the Frontend (React):
#### 1. Navigate to the frontend folder:
  ```bash
  cd client
  ```
#### 2. Install dependencies:
  ```bash
  npm install
  ```
#### 3. Start the frontend server:
  ```bash
  npm start
  ```
The frontend should now be running at http://localhost:5173.

## Usage
- **Register a new user**: Enter a username and password to register.
- **Log in**: Use the registered credentials to log in and access the todo tasks.
- **Manage Todos**: Add, edit, mark as completed, and delete tasks.
- **Log out**: Click the logout button to exit your session.

### Endpoints
### Authentication
- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in and obtain a JWT token for authenticated requests.

### Todo API
- **GET /api/todos**: Get all todos for the authenticated user.
- **POST /api/todos**: Create a new todo.
- **PUT /api/todos/:id**: Update a specific todo.
- **DELETE /api/todos/:id**: Delete a specific todo.
- **PUT /api/todos/:id/complete**: Mark a todo as completed.






