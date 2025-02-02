# React + Vite
# Roro Airlines Management System

## Project Overview
Roro Airlines Management System is a full-stack web application designed to facilitate airline management, including handling airlines, flights, passengers, bookings, and seat reservations. The project consists of a **React frontend** and a **Flask backend**.

## Features
- Manage Airlines (Create, Read, Update, Delete)
- Manage Flights (CRUD operations)
- Manage Passengers (CRUD operations)
- Manage Bookings (CRUD operations)
- Manage Seat Reservations (CRUD operations)
- User-friendly interface with real-time updates

## Live Demo
- **Frontend**: [Netlify Deployment](roro-international-airport-frontend.netlify.app)
- **Backend**: [Render Deployment](https://roro-airlines-full-stack-1.onrender.com)

## Backend Repository
[Backend Repository Link] *(https://github.com/RomeOtieno501/roro-airlines-full-stack.git)*

---

## Installation and Setup

### Prerequisites
- Node.js and npm installed
- Git installed

### Clone the Repository
```sh
git clone https://github.com/your-username/your-frontend-repo.git
cd your-frontend-repo
```

### Install Dependencies
```sh
npm install
```

### Start the Development Server
```sh
npm run dev
```
The application will be available at `http://localhost:5173/`.

## Project Structure
```
frontend/
│── src/
│   ├── components/      # Reusable components
│   ├── pages/           # Application pages
│   ├── styles/          # CSS files
│   ├── routes/          # Routing configuration
│   ├── App.js           # Main app component
│   ├── main.jsx         # Entry point
│── public/              # Static assets
│── package.json         # Project dependencies
│── vite.config.js       # Vite configuration
```

## API Endpoints
The frontend interacts with the backend using the following API endpoints:

### Airlines
- `GET /airlines` - Retrieve all airlines
- `POST /airlines` - Create a new airline
- `PATCH /airlines/:id` - Update an airline
- `DELETE /airlines/:id` - Delete an airline

### Flights
- `GET /flights` - Retrieve all flights
- `POST /flights` - Create a new flight
- `PATCH /flights/:id` - Update a flight
- `DELETE /flights/:id` - Delete a flight

### Passengers
- `GET /passengers` - Retrieve all passengers
- `POST /passengers` - Create a new passenger
- `PATCH /passengers/:id` - Update a passenger
- `DELETE /passengers/:id` - Delete a passenger

### Bookings
- `GET /bookings` - Retrieve all bookings
- `POST /bookings` - Create a new booking
- `PATCH /bookings/:id` - Update a booking
- `DELETE /bookings/:id` - Cancel a booking

### Seats
- `GET /seats` - Retrieve all seats
- `POST /seats` - Create a new seat
- `DELETE /seats/:id` - Delete a seat

## License
This project is open-source and available under the [MIT License](LICENSE).
