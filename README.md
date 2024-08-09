# Project Title

SupportDesk

## Overview

SupportDesk is a platform designed to streamline and enhance the efficiency of customer support teams. It provides tools to manage the entire lifecycle of support tickets, from creation and prioritization to assignment, resolution, and closure. By addressing the common challenges faced by support teams, SupportDesk aims to promote a more responsive, organized, and effective approach to customer support.

### Problem

Customer support teams often struggle with delayed response times, inconsistent customer experiences, lack of visibility and accountability, and overwhelming volumes of support requests. These challenges lead to customer dissatisfaction and inefficiencies within the support process. SupportDesk is designed to tackle these pain points by offering a centralized system for managing support tickets, ensuring that support teams can operate more efficiently and effectively.

### User Profile

SupportDesk is intended for use by customer support teams across various industries, including technology, retail, finance, and more. The primary users will be customer support agents, team leads, and managers. Special considerations include the need for a user-friendly interface, real-time updates, and role-based access control to ensure that users only see the information relevant to their role.

- **Agents**

  - **Create, View, Edit Tickets**: Can create new support tickets, view assigned tickets, and update ticket status, priority or details.
  - **Comment on Tickets**: Add comments to tickets they are working on or assigned to.
  - **Access Knowledge Base**: Search and view articles in the Knowledge Base to resolve issues.

- **Team Lead / Managers**

  - **Full Dashboard Access**: View comprehensive team performance, including ticket statistics and agent activities.
  - **Assign Tickets**: Can assign or reassign tickets to specific agents based on workload or expertise.
  - **Prioritize and Escalate Tickets**: Ability to change ticket priority or escalate issues to higher levels agents.
  - **View, Edit All Tickets**: Can view and edit any ticket in their org (Agents that report to them).
  - **Comment on Tickets**: Add comments to any ticket and provide guidance or feedback to agents.
  - **Manage Knowledge Base**: Create, edit, or delete articles in the Knowledge Base.

- **Customer**
  - **Submit Tickets**: Create new support tickets by providing details of their issues or questions.
  - **View Ticket Status**: Track the status of their submitted tickets, including updates and resolutions.
  - **Access Public Knowledge Base**: Search and view public articles in the Knowledge Base.

### Features

- **Ticket Creation and Management**: Users can create new support tickets, including details like customer information, issue description, and priority level.
- **Ticket Prioritization**: Tickets can be prioritized based on factors such as urgency, customer importance, and issue type.
- **Assignment and Escalation**: Tickets can be assigned to specific agents or teams, with the ability to escalate tickets if needed.
- **Status Tracking**: Real-time tracking of ticket status, including updates on progress and resolution.
- **Automated Responses**: Predefined responses to common issues, reducing response times for frequently asked questions.
- **Knowledge Base/FAQ**: A centralized repository of information that both agents and customers can access for self-service.
- **Reporting and Analytics**: Comprehensive reports on ticket volume, response times, customer satisfaction, and team performance.
- **Role-Based Access Control**: Different access levels for agents, team leads, and managers, ensuring data security and relevant visibility.
  ![User Interaction](/images/UserInteraction.png)

## Implementation

### Tech Stack

- **Styling**: CSS/Sass for custom styles and animations.
- **Frontend**: React.js for building dynamic user interfaces.
- **Backend**: Node.js with Express for building the server-side logic.
- **Database**: MySQL for managing relational data.
- **Authentication**: TBD.
- **Libraries**:
  - `Knex.js` for SQL query building.
  - `express-validator` for input validation.

### APIs

- **Third-Party Email API**: For sending automated email notifications (SendGrid: https://www.twilio.com/docs/sendgrid/for-developers/sending-email/quickstart-nodejs#nodejs).
- **Third-Party AI**: For creating automated responses (OpenAI: https://platform.openai.com/docs/libraries/node-js-library).

### Sitemap

1. **Login/Sign Up**: User authentication pages.
2. **Dashboard**: Overview of current tickets, quick stats, and alerts.
3. **Ticket Management**: Create, view, edit, and manage support tickets.
4. **Knowledge Base/FAQ**: Access to common issues and resolutions.
5. **Reports & Analytics**: Detailed reports on support performance.
6. **User Profile**: Manage user information and settings.
7. **Admin Panel**: Role management, system settings, and user permissions.

### Mockups

- **Login Page**: Clean and simple login interface with branding.
- **Dashboard**: Overview screen with ticket summaries and quick actions.
- **Ticket Details**: Detailed view of a support ticket with all relevant information.
- **Reports Page**: Graphical representation of data for easy analysis.

### Data

- **SQL Diagram**
  ![SQL Diagram](images/ER.Diagram.png)

### Endpoints

- **GET /api/tickets**: Fetch all tickets.
- **GET /api/tickets/:id**: Fetch single ticket.
- **POST /api/tickets**: Create a new ticket.
- **PUT /api/tickets/:id**: Update ticket information.
- **DELETE /api/tickets/:id**: Delete a ticket.
- **GET /api/users**: Fetch users information.
- **GET /api/users/:id**: Fetch user information.
- **GET /api/users/:id/tickets**: Fetch all tickets for a user.

### Auth

Authentication will be implemented using _TBD_. Users will need to sign in to access most features, with role-based access control ensuring that each user can only access appropriate data.

## Roadmap

### Sprint 1: Foundations (Weeks 1)

- Set up project structure and environment.
- Implement basic authentication (Sign Up, Login).
- Create database schema and create initial migrations/seeds.

### Sprint 2: Core Features (Weeks 2-3)

- Develop ticket creation, management, and status tracking.
- Implement ticket prioritization and assignment features.
- Create the dashboard with an overview of ticket stats.

### Sprint 3: Enhancements (Weeks 4)

- Integrate automated responses and knowledge base.
- Implement reporting and analytics.
- Finalize UI/UX design and polish user interface.

## Nice-to-haves

- **AI-Powered Suggestions**: Integrate AI to suggest responses based on historical data.
