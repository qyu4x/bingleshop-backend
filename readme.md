# BingleShop Project

Welcome to the **BingleShop** project! Follow the steps below to set up and run the project on your local machine.

Dependencies:

---

- **bcrypt**: Version ^5.1.1
    - Used for secure password hashing and verification.

- **dotenv**: Version ^16.4.5
    - Allows loading environment variables from a `.env` file into `process.env`, facilitating application configuration management.

- **express**: Version ^4.19.2
    - A minimalist web framework for Node.js, used to build APIs and handle routing.

- **joi**: Version ^17.13.1
    - Used for input data validation, ensuring the received data adheres to the expected schema.

- **nodemon**: Version ^3.1.0
    - A development tool that automatically restarts the server upon detecting file changes during development.

- **pg**: Version ^8.11.5
    - PostgreSQL client for Node.js, used for interacting with PostgreSQL databases.

- **pg-hstore**: Version ^2.3.4
    - Used for serializing and deserializing hstore data type in PostgreSQL.

- **sequelize**: Version ^6.37.3
    - An Object-Relational Mapping (ORM) library for Node.js, simplifying interactions with SQL databases like PostgreSQL.

- **uuid**: Version ^9.0.1
    - Used to generate UUIDs (Universally Unique Identifiers), commonly used as unique IDs for database entities.

- **winston**: Version ^3.13.0
    - A logging library for Node.js that supports multiple log levels and flexible log output formats. The logger is configured to log events when the 'finish' event is triggered, providing detailed information about requests and responses in the application.

- **winston-daily-rotate-file**: Version ^5.0.0
    - A Winston transport that allows daily log file rotation, keeping log files manageable and preventing them from growing too large too quickly.

---

**Note**: 
- This application uses Unix timestamp format for datetime values because it is based on UTC. This approach provides greater flexibility in handling different timezones.
- This project uses token-based authorization, where tokens are stored in the database. This allows the middleware to automatically identify user roles and identities.

---

## 🚀 Getting Started

### 1. Clone the Repository

First, clone the repository to your local machine:

```sh
git clone https://github.com/qyu4x/kelompok1-bej-final-project 
```

### 2. Navigate to the Project Directory

Change your directory to the project folder:

```sh
cd ./kelompok1-bej-final-project 
```

### 3. Install Dependencies

Install the required dependencies using npm:

```sh
npm install 
```

### 4. Set Up PostgreSQL with Docker

Run PostgreSQL using Docker Compose:

```sh
docker compose up -d
```

### 5. Run Database Migrations

Run the database migrations to set up the schema:

```sh
npx sequelize-cli db:migrate
```

### 6. Seed the Database

Seed the database to create an admin account:

```sh
npx sequelize-cli db:seed:all 
```

### 7. Admin Account Access

Use the following credentials to log in as an admin:

```json
{
  "email": "shironeko@bingleshop.com",
  "password": "nekonyan"
}
```

## 📌 Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) and npm

## 📚 Documentation and Support

For more details and documentation, please visit our [Wiki](https://github.com/qyu4x/kelompok1-bej-final-project/tree/main/docs/spec) or join our [Discord](https://discord.gg/qirayuki).

## 🎉 You're All Set!

You now have everything you need to start using the **BingleShop** project. If you encounter any issues or have any questions, feel free to reach out or check the documentation.

Happy coding! 🚀

---

*Note: Make sure you have Docker and Node.js installed on your machine before you start. For further information, please refer to the official Docker and Node.js documentation.*

