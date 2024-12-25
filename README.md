# Responsive Web App - MEAN Stack

This repository contains a responsive web application built using the MEAN stack with the Nx.dev monorepo tool. The project implements a user authentication system, a protected data list, and several additional features to enhance functionality.

## Features

- **Signup, Signin, and Signout**: Users can create accounts, log in, and log out. Registered users stay signed in for 8 hours unless they sign out manually.
- **Protected Data List**: A list of users/products visible only to logged-in users.
- **Forgot Password**: A feature to help users reset their passwords.
- **MongoDB Atlas Integration**: The database is hosted online using MongoDB Atlas.

## Technology Stack

- **Frontend**: Angular with NGRX for state management.
- **Backend**: NestJS for API development.
- **Database**: MongoDB hosted on Atlas.
- **Monorepo Tool**: Nx.dev for efficient development and code organization.

## Folder Structure

- **apps/frontend**: Contains the Angular application.
- **apps/backend**: Contains the NestJS API application.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Update the `.env` files for both `frontend` and `backend` applications with the appropriate configuration values (e.g., MongoDB Atlas credentials).

## Running the Application

To run both the frontend and backend applications simultaneously:

```bash
npm start
```

This command will execute the following script from the `package.json` file:

```json
"scripts": {
  "start": "nx serve frontend & nx serve backend"
}
```

- The frontend app will be available at `http://localhost:4200`
- The backend app will be available at `http://localhost:3000`

## API Documentation

The backend API is documented using Postman. You can find the API documentation [here](https://documenter.getpostman.com/view/17068729/2sAYBVgWSa).

## Demonstration

A recording demonstrating the app functionality and a code walkthrough has been submitted as part of the project.

## Bounty Points Features

1. **Forgot Password**: Allows users to reset their password via email.
2. **Protected Data List**: Displays a list of data (e.g., users/products) visible only after successful login.

## Contribution

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

---

For any issues or queries, feel free to reach out!
