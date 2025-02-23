# Aviation Route Planner

## Overview
An aviation route planning solution that helps users find optimal flight paths between different locations. This application provides a user-friendly interface for managing airports, transportation routes, and finding the most efficient routes between destinations. Built with a robust Spring Boot backend and responsive Vue.js frontend, it offers RESTful APIs for seamless integration and real-time route calculations.

## Project Structure
- `aviation-route-planner-app/` - Spring Boot backend application
- `aviation-route-planner-ui/` - Vue.js frontend application
- `aviation_route_planner_postman_collection.json` - Postman API collection for testing

## Prerequisites
- Java 17 or higher
- Node.js 16+ and npm
- Maven 3.8+
- PostgreSQL 14+

## Technology Stack
### Backend
- Spring Boot 3.x
- Spring Data JPA
- PostgreSQL
- Maven
- JUnit 5

### Frontend
- React
- Vite
- Axios

## API Documentation

### Locations
- `GET /api/v1/locations` - Get all locations
- `GET /api/v1/locations/:id` - Get location by ID
- `POST /api/v1/locations` - Create new location
- `DELETE /api/v1/locations/:id` - Delete location

### Transportations
- `GET /api/v1/transportations` - Get all transportations
- `GET /api/v1/transportations/:id` - Get transportation by ID
- `POST /api/v1/transportations` - Create new transportation
- `DELETE /api/v1/transportations/:id` - Delete transportation

### Routes
- `GET /api/v1/routes` - Get valid routes between locations

## Setup Instructions

### Database Setup
```sql
CREATE DATABASE aviation_route_planner;
```

### Environment Variables
Create .env file in the backend root:
```
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/aviation_route_planner
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
```

### Backend Setup
```sh

cd aviation-route-planner-app
./mvnw spring-boot:run
```

### Frontend Setup
```sh

cd aviation-route-planner-ui
npm install
npm run dev
```


