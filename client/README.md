# SupportDesk - Front End

## Overview

The SupportDesk Front End is built with React.js and designed to provide a dynamic and user-friendly interface for the SupportDesk platform. This React-based interface allows users to efficiently manage support tickets, access the knowledge base, and interact with the SupportDesk system through a clean and intuitive design.

## Features

- **User Authentication**: Provides login and sign-up functionality with role-based access control.
- **Dashboard**: Displays an overview of team performance, ticket statistics, and key performance indicators.
- **Ticket Management**: Allows users to create, view, edit, and manage support tickets. Includes features for ticket prioritization, assignment, and status tracking.
- **Comments & Notifications**: Enables users to comment on tickets and receive real-time notifications for updates.
- **Knowledge Base**: Users can access and search for knowledge base articles to aid in ticket resolution.
- **Responsive Design**: Optimized for a smooth experience across various devices and screen sizes.

## Tech Stack

- **React.js**: The core library for building the user interface.
- **Material UI**: Provides a robust set of React components that implement Google's Material Design.
- **Sass**: For custom styling and animations.
- **Axios**: Used for making HTTP requests to the backend.
- **React-Quill**: WYSIWYG text editor for rich text editing in ticket comments and knowledge base articles.
- **React Router**: For client-side routing and navigation within the application.

## Setup and Installation

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your machine.

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/hstahelin/supportdesk.git
   ```

2. **Navigate to the Front End Project Directory**

   ```bash
   cd supportdesk/client
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Run the Development Server**

   ```bash
   npm start
   ```

   This will start the development server and open the application in your default web browser.

## Configuration

Configuration settings, such as API endpoints and authentication tokens, should be managed in environment variables. Create a `.env` file in the root directory and include the necessary variables:

```plaintext
REACT_APP_API_URL=https://api.supportdesk.com
REACT_APP_AUTH_TOKEN=your_auth_token
```

## API Integration

The front end communicates with the back end via RESTful APIs. Here are the key endpoints used:

- **Tickets**

  - `GET /tickets`: Fetch all tickets.
  - `POST /tickets`: Create a new ticket.
  - `GET /tickets/:id`: Fetch a specific ticket by ID.
  - `PUT /tickets/:id`: Update a ticket by ID.
  - `GET /tickets/:id/comments`: Fetch comments for a ticket.
  - `POST /tickets/:id/comments`: Add a comment to a ticket.

- **Users**

  - `GET /users`: Fetch all users.
  - `GET /users/:id`: Fetch a specific user by ID.
  - `POST /users/:id`: Update user details.

- **Knowledge Base**
  - `GET /kb`: Fetch all knowledge base articles.
  - `POST /kb`: Create a new article.
  - `GET /kb/:id`: Fetch a specific article by ID.
  - `PUT /kb/:id`: Update an article by ID.

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
- GitHub Issues: [SupportDesk Front End Issues](https://github.com/hstahelin/supportdesk/issues)
