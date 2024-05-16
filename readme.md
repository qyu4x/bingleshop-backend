# UWUpedia Gold Project

![UWUpedia Logo](https://ih1.redbubble.net/image.5285530497.6871/raf,360x360,075,t,fafafa:ca443f4786.jpg)

Welcome to the **UWUpedia Gold** project! Follow the steps below to set up and run the project on your local machine.

## 🚀 Getting Started

### 1. Clone the Repository

First, clone the repository to your local machine:

```sh
git clone https://github.com/qyu4x/24001132-11-ak-uwupedia-gold
```

### 2. Navigate to the Project Directory

Change your directory to the project folder:

```sh
cd ./24001132-11-ak-uwupedia-gold
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
  "email": "shironeko@uwupedia.com",
  "password": "rahasia"
}
```

## 📌 Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) and npm

## 📚 Documentation and Support

For more details and documentation, please visit our [Wiki](https://github.com/qyu4x/24001132-11-ak-uwupedia-gold/wiki) or join our [Discord](https://discord.gg/your-invite-link).

## 🎉 You're All Set!

You now have everything you need to start using the **UWUpedia Gold** project. If you encounter any issues or have any questions, feel free to reach out or check the documentation.

Happy coding! 🚀

---

*Note: Make sure you have Docker and Node.js installed on your machine before you start. For further information, please refer to the official Docker and Node.js documentation.*

---

Feel free to customize the README further to better suit your project and style preferences.
