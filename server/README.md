# SupportDesk - Back End

## Overview

The SupportDesk Back End is built with Node.js and Express, providing a robust server-side infrastructure for the SupportDesk platform. It handles API requests, manages data interactions, and integrates with the front end to deliver a seamless experience for managing support tickets and knowledge base articles.

## Features

- **API Endpoints**: Provides a comprehensive set of RESTful APIs for managing tickets, users, and knowledge base articles.
- **Authentication**: Implements user authentication and role-based access control using Passport.js.
- **Database Management**: Interfaces with a MySQL database to store and retrieve data.
- **Automated Responses**: Integrates with third-party AI services to generate automated responses.

## Tech Stack

- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web application framework for Node.js, providing robust routing and middleware capabilities.
- **MySQL**: Relational database management system for storing data.
- **Passport.js**: Authentication middleware for Node.js, used for managing user authentication and sessions.
- **Knex.js**: SQL query builder for interacting with the database.
- **OpenAI**: For generating automated responses (optional integration).

## Setup and Installation

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your machine.
- MySQL server running and configured.

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/hstahelin/supportdesk.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd supportdesk/server
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Configure Environment Variables**

   Create a `.env` file in the root directory with the following content:

   ```plaintext
    SESSION_SECRET=your_jwt_secret
    PORT=your_port
    DB_HOST=localhost
    DB_LOCAL_DBNAME=supportdesk_db
    DB_LOCAL_USER=your_username
    DB_LOCAL_PASSWORD=your_password
    OPENAI_API_KEY=your_openai_api_key
   ```

5. **Set Up the Database**

   Run the database migrations and seed the database:

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

6. **Start the Server**

   ```bash
   npm start
   ```

   The server will start and listen for requests on the port specified in the `.env` file.

## API Endpoints

### Tickets

- **GET /tickets**: Fetch all tickets.
- **POST /tickets**: Create a new ticket.
- **GET /tickets/status-summary**: Get a summary of ticket statuses.
- **GET /tickets/priority-summary**: Get a summary of ticket priorities.
- **GET /tickets/:id**: Fetch a single ticket by ID.
- **PUT /tickets/:id**: Update a ticket by ID.
- **GET /tickets/:id/comments**: Fetch comments for a specific ticket.
- **POST /tickets/:id/comments**: Add a comment to a specific ticket.
- **GET /tickets/:id/timeline**: Fetch the timeline of a specific ticket.

### Users

- **GET /users**: Fetch all users.
- **GET /users/notifications**: Get notifications for the authenticated user.
- **GET /users/:id**: Fetch a specific user by ID.
- **POST /users/:id**: Update a specific user by ID.
- **GET /users/:id/reportingUsers**: Fetch reporting users for a specific user by ID.

### Knowledge Base

- **GET /kb**: Fetch all knowledge base articles.
- **POST /kb**: Create a new knowledge base article.
- **GET /kb/:id**: Fetch a specific knowledge base article by ID.
- **PUT /kb/:id**: Update a specific knowledge base article by ID.

### AI

- **POST /ai**: Get a ticket possible solution from the AI.

## Authentication

Authentication is managed using Passport.js. Users must sign in to access secured endpoints. JWT (JSON Web Tokens) is used for session management.

## Development

- **Database Migrations**: Use Knex.js to handle database schema changes and data migrations.

## Contributing

Contributions are welcome! Please follow the standard Git workflow:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch and open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, please reach out to:

- Email: hugo.stahelin@gmail.com
- GitHub Issues: [SupportDesk Back End Issues](https://github.com/hstahelin/supportdesk/issues)
