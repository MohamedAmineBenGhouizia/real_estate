# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### Register
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "client" // Optional, default: client
  }
  ```
- **Success Response**: `201 Created` with User object and Token.

### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: `200 OK` with User object and Token.

### Get Current User
- **URL**: `/auth/me`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response**: `200 OK` with User object.

## Properties

### Get All Properties
- **URL**: `/properties`
- **Method**: `GET`
- **Query Params**:
  - `type`: Property type (Apartment, House, etc.)
  - `minPrice`: Minimum price
  - `maxPrice`: Maximum price
- **Success Response**: `200 OK` with Array of Properties.

### Get Single Property
- **URL**: `/properties/:id`
- **Method**: `GET`
- **Success Response**: `200 OK` with Property object.

### Create Property (Admin)
- **URL**: `/properties`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `FormData` (multipart/form-data)
  - `title`: String
  - `description`: String
  - `price`: Number
  - `address`: String
  - `type`: String
  - `status`: String
  - `images`: File[]
- **Success Response**: `201 Created` with Property object.

### Update Property (Admin)
- **URL**: `/properties/:id`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `FormData` (multipart/form-data)
- **Success Response**: `200 OK` with updated Property object.

### Delete Property (Admin)
- **URL**: `/properties/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response**: `200 OK` with message.

## Reservations

### Create Reservation
- **URL**: `/reservations`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "propertyId": 1,
    "startDate": "2023-12-01",
    "endDate": "2023-12-05"
  }
  ```
- **Success Response**: `201 Created` with Reservation object.

### Get My Reservations
- **URL**: `/reservations/my`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response**: `200 OK` with Array of Reservations.

### Get All Reservations (Admin)
- **URL**: `/reservations`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response**: `200 OK` with Array of Reservations.

### Update Reservation Status (Admin)
- **URL**: `/reservations/:id/status`
- **Method**: `PATCH`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "status": "confirmed" // or "cancelled"
  }
  ```
- **Success Response**: `200 OK` with updated Reservation object.

## Invoices

### Get All Invoices (Admin)
- **URL**: `/invoices`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response**: `200 OK` with Array of Invoices.
