# eCommerce API

REST API for managing users, categories, products, and orders.

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Zod

## Data Models

### User

| Field    | Type   | Rules                                 |
| -------- | ------ | ------------------------------------- |
| name     | string | required                              |
| email    | string | required, unique                      |
| password | string | required, excluded from API responses |

### Category

| Field | Type   | Rules    |
| ----- | ------ | -------- |
| name  | string | required |

### Product

| Field       | Type     | Rules                          |
| ----------- | -------- | ------------------------------ |
| name        | string   | required                       |
| description | string   | required                       |
| price       | number   | required, must not be negative |
| categoryId  | ObjectId | required, references Category  |

A product can only be created or updated when its `categoryId`
references an existing category.

### Order

| Field                | Type     | Rules                                   |
| -------------------- | -------- | --------------------------------------- |
| userId               | ObjectId | required, references User               |
| products             | array    | required, contains product and quantity |
| products[].productId | ObjectId | required, references Product            |
| products[].quantity  | number   | required, integer, at least 1           |
| total                | number   | calculated by the server                |
| createdAt            | Date     | generated automatically                 |
| updatedAt            | Date     | generated automatically                 |

An order can only be created or updated when its user and all its
products exist. The server calculates the total using the current
product prices and the requested quantities.

## API Health Check

```http
GET /health
```
