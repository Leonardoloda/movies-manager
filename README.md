# Movies Manager

## Overview

This repository contains a serverless application for managing a movies database. The application is built using TypeScript and AWS Lambda functions to perform CRUD (Create, Read, Update, Delete) operations on a DynamoDB table. The application is configured using the Serverless Framework and includes integration tests written with Jest.

## Architecture

The application consists of five AWS Lambda functions:

1. `createMovie`: Adds a new movie to the DynamoDB table.
2. `getMovie`: Retrieves a movie by its ID from the DynamoDB table.
3. `getMovies`: Retrieves all movies from the DynamoDB table.
4. `updateMovie`: Updates an existing movie in the DynamoDB table.
5. `deleteMovie`: Deletes a movie by its ID from the DynamoDB table.

## DynamoDB Table

The application uses DynamoDB to store movie information. The table schema is as follows:

- **Primary Key**: `id` (string)
- **Attributes**:
  - `title` (string)
  - `director` (string)
  - `genre` (string)
  - `release` (number)
  - `rating` (number)

## Setup

### Prerequisites

- Node Version Manager (NVM)
- Node.js (>= 20.x)
- Serverless Framework (>= 2.x)
- AWS Access Key configured with appropriate permissions

### Installation

1. Clone the repository:

```bash
    git clone https://github.com/yourusername/movies-crud-serverless.git
    cd movies-manager
```

2. Set the Node version:

```bash
    nvm use
```

3. Install dependencies:

```bash
    yarn
```

4. Create a new file with you environment variables, use `.env.example` as ane example

## Application

### Lambda Functions

#### createMovie

- Description: Creates a new movie.
- Endpoint: POST /movie
- Request Body:

```json
{
  "title": "The Godfather",
  "director": "Francis Ford Coppola",
  "releaseDate": "1972-03-24",
  "rating": 9.2
}
```

- Response:

```json
{
  "id": "fc7568ce-48b5-43ca-b85c-c1604e49a1d0",
  "title": "The Shawshank Redemption",
  "director": "Frank Darabont",
  "release": 1994,
  "genre": "Drama",
  "rating": 9
}
```

#### readMovie

- Description: Retrieves a movie by its ID.
- Endpoint: GET /movie/{id}
- Response:

```json
{
  "id": "fc7568ce-48b5-43ca-b85c-c1604e49a1d0",
  "title": "The Shawshank Redemption",
  "director": "Frank Darabont",
  "release": 1994,
  "genre": "Drama",
  "rating": 9
}
```

#### readMovies

- Description: Retrieves all movies.
- Endpoint: GET /movies
- Response:

```json
[
  {
    "id": "fc7568ce-48b5-43ca-b85c-c1604e49a1d0",
    "title": "The Shawshank Redemption",
    "director": "Frank Darabont",
    "release": 1994,
    "genre": "Drama",
    "rating": 9
  },
  ...
]
```

#### updateMovie

- Description: Updates an existing movie.
- Endpoint: PUT /movie/{id}
- Request Body:

```json
{
  "title": "The Godfather Part II",
  "director": "Francis Ford Coppola",
  "releaseDate": "1974-12-20",
  "rating": 9.0
}
```

- Response:

```json
{
  "id": "fc7568ce-48b5-43ca-b85c-c1604e49a1d0",
  "title": "The Shawshank Redemption",
  "director": "Frank Darabont",
  "release": 1994,
  "genre": "Drama",
  "rating": 9
}
```

#### deleteMovie

- Description: Deletes a movie by its ID.
- Endpoint: DELETE /movie/{id}
- Response:

```json
{
  "message": "Movie deleted successfully "
}
```

## Deployment

Deploy the application to AWS:

```bash
    yarn deploy
```

## Testing

### Integration Tests

Integration tests are written using Jest and simulate API calls to the Lambda functions, writing to a dedicated testing DynamoDB table.

Run the tests:

```bash
    npm test
```

### Configuration for Testing

Ensure the DynamoDB table name in the test configuration matches the one used for testing purposes.
