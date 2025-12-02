This backend powers a secure Personal Diary Application, built with Node.js, Express, MongoDB, and JWT authentication.
Each user can register, log in, and privately manage their diary entries, ensuring complete privacy and secure access.
The backend provides APIs for:
User Authentication: Register, Login, JWT token generation, protected routes
Diary Management: Create, read, update, delete diary entries
User-Specific Data: Each diary note belongs to its authenticated user only
Security: Password hashing with bcrypt, JWT verification, CORS enabled
Environment variables such as MONGO_URI, JWT_SECRET, and PORT are used for configuration, and .env should never be committed to GitHub.
The backend is fully deployable on platforms like Render, Railway, or any Node.js hosting service.
This backend works seamlessly with the Personal Diary Frontend (React + Tailwind) to deliver a complete MERN-stack diary application with authentication, animations, and a clean UI.
