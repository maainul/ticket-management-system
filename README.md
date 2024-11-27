# Ticket Management System

# Run Project :

      npm install

      npm run tms

      npm start

## User Register : http://localhost:1337/auth/register

```json
{
  "email": "admin@admin.com",
  "password": "12345",
  "role": "admin"
}
```

## login : http://localhost:1337/auth/login

```json
{
  "email": "admin@admin.com",
  "password": "12345"
}
```

## Create new Bus : http://localhost:1337/admin/bus

```json
{
  "busNumber": "A123406",
  "busName": "Express 1012",
  "route": "Uttara - Comilla",
  "capacity": 100,
  "schedule": [
    {
      "dayOfWeek": "Monday",
      "departureTime": "08:00"
    },
    {
      "dayOfWeek": "Tuesday",
      "departureTime": "09:30"
    },
    {
      "dayOfWeek": "Wednesday",
      "departureTime": "10:00"
    },
    {
      "dayOfWeek": "Thursday",
      "departureTime": "11:00"
    }
  ]
}
```

## List Of Buses : http://localhost:1337/buses

## Create New Ticket : http://localhost:1337/admin/ticket

```json
{
  "bus": "6747210683c8d39e1964ba42",
  "departureTime": "02:00",
  "price": 250,
  "availableSeats": 200,
  "created_by": "60d6f6f6f8e8b0b7a8b8b8b8",
  "updated_by": "60d6f6f6f8e8b0b7a8b8b8b8"
}
```

## List of Ticket : http://localhost:1337/tickets

## Purchase New Tickt : http://localhost:1337/tickets/purchase

```json
{
  "busId": "6747210683c8d39e1964ba42", // Replace with actual bus ID
  "departureTime": "10:00", // Example time in HH:mm format
  "numberOfSeats": 1000, // Number of seats to book
  "userId": "64a02abc8f8a5d1f8b8b8b8b" // Replace with actual user ID
}
```
