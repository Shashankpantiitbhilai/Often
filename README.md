# Travel Itinerary Management System

## Overview
This project implements a comprehensive backend system for managing travel itineraries, particularly for the Phuket and Krabi regions in Thailand. The system includes a robust database architecture, RESTful API endpoints, and an MCP server that provides recommended itineraries based on duration.

## Project Structure
```
travel-itinerary-system/
├── backend/
│   ├── __pycache__/
│   ├── crud.py           # CRUD operations for database interaction
│   ├── database.py       # Database connection and session management
│   ├── main.py           # FastAPI application entry point
│   ├── models.py         # SQLAlchemy ORM models
│   ├── requirements.txt  # Backend dependencies
│   ├── schemas.py        # Pydantic schemas for request/response models
│   └── seed.py           # Scripts to seed the database with initial data
├── src/                  # Frontend React application
│   ├── components/       # Reusable UI components
│   ├── pages/            # Application pages
│   ├── services/         # API service integration
│   ├── App.tsx           # Main React component
│   ├── index.css         # Global styles
│   └── main.tsx          # Entry point for React app
├── .eslintrc.js          # ESLint configuration
├── index.html            # HTML template
├── package-lock.json     # Dependency lock file
├── package.json          # Project configuration and dependencies
├── postcss.config.js     # PostCSS configuration
├── README.md             # Project documentation
├── requirements.txt      # Project dependencies
├── tailwind.config.js    # Tailwind CSS configuration
├── travel_itinerary.db   # SQLite database file
├── tsconfig.app.json     # TypeScript configuration for the app
├── tsconfig.json         # Main TypeScript configuration
└── vite-env.d.ts         # Vite environment type declarations
```

## Features
- **Database Architecture**
  - SQLAlchemy ORM models for itineraries, accommodations, transfers, and activities
  - Proper relationships and constraints between entities
  - Seeded with realistic data for Thailand's Phuket and Krabi regions

- **RESTful API**
  - FastAPI endpoints for creating and viewing itineraries
  - Input validation and error handling
  - Well-documented API with clear request/response formats

- **MCP Server**
  - Recommendation engine for itineraries based on duration (2-8 nights)
  - Intelligent selection of accommodations, transfers, and activities

## Technology Stack
- **Backend**
  - Python 3.8+
  - FastAPI
  - SQLAlchemy
  - SQLite (for development)
  - Pydantic

- **Frontend**
  - React
  - TypeScript
  - Tailwind CSS
  - Vite

## Installation and Setup

### Prerequisites
- Python 3.8 or higher
- Node.js 16.x or higher
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Seed the database:
   ```bash
   python seed.py
   ```

5. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Endpoints

#### Get Recommended Itineraries
```
GET /api/itineraries/recommended?nights={number_of_nights}
```
- Returns recommended itineraries based on the specified duration.

#### Create Itinerary
```
POST /api/itineraries/
```
- Creates a new itinerary with accommodations, transfers, and activities.

#### Get Itinerary
```
GET /api/itineraries/{itinerary_id}
```
- Retrieves the details of a specific itinerary.

#### List Itineraries
```
GET /api/itineraries/
```
- Returns a list of all itineraries.

## Database Schema
The database schema includes the following tables:
- `itineraries`: Main itinerary information
- `accommodations`: Hotel and lodging information
- `transfers`: Transportation between locations
- `activities`: Excursions and activities
- Appropriate junction tables for many-to-many relationships

## License
This project is intended for educational purposes and provided as an assignment solution.

---

# Implementation One-Pager

## Steps Followed to Complete the Assignment

1. **Initial Planning and Design**
   - Analyzed requirements and created a system architecture plan
   - Designed database schema with appropriate relationships
   - Planned API endpoints and response structures

2. **Database Implementation**
   - Created SQLAlchemy models for all entities
   - Set up relationships between models
   - Implemented database connection handling

3. **API Development**
   - Implemented FastAPI endpoints for itinerary management
   - Created Pydantic schemas for request/response validation
   - Added error handling and appropriate status codes

4. **MCP Server Implementation**
   - Developed algorithms for itinerary recommendations
   - Integrated with the database to fetch appropriate data

5. **Data Seeding**
   - Researched realistic data for Phuket and Krabi regions
   - Created seed scripts to populate the database

6. **Testing and Refinement**
   - Tested all endpoints for functionality
   - Verified recommendation logic
   - Refined error handling and edge cases

## Key Decisions Made

1. **Technology Stack Selection**
   - Chose FastAPI for its performance and automatic documentation
   - Selected SQLAlchemy for ORM to simplify database operations
   - Used SQLite for development for simplicity and ease of setup

2. **Database Design Decisions**
   - Implemented a flexible schema that can accommodate different types of itineraries
   - Used junction tables for many-to-many relationships
   - Added appropriate indexes to optimize query performance

3. **API Design Choices**
   - Created intuitive, RESTful endpoints
   - Implemented comprehensive validation to ensure data integrity
   - Designed clear error responses to aid debugging

## Assumptions Made

1. **User Authentication**
   - Assumed authentication would be handled separately
   - Prepared models for future integration with user authentication

2. **Data Requirements**
   - Assumed recommended itineraries should include variety in accommodation types
   - Assumed transfers could include multiple transportation modes
   - Assumed activities should have time slots and duration information

3. **System Usage**
   - Designed for moderate load and scalability
   - Assumed the system would primarily serve as a backend for a travel planning application

## Challenges Faced and Solutions

1. **Complex Relationship Modeling**
   - Challenge: Designing flexible but normalized relationships between entities
   - Solution: Created junction tables and implemented SQLAlchemy relationship helpers

2. **Recommendation Algorithm**
   - Challenge: Creating meaningful recommendations based on limited parameters
   - Solution: Implemented a scoring system based on popularity, balance of activities, and logical 
   flow

3. **Data Organization**
   - Challenge: Structuring day-wise itinerary data in a queryable format
   - Solution: Created a day-based structure with ordered activities and logical transitions between events