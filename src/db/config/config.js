require("dotenv").config();

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_DIALECT, DB_PORT } =
    process.env;

module.exports = {
  development: {
    username: 'postgres',
    password: 'secret',
    database: 'bingleshop',
    host: 'bingleshop-postgres',
    dialect: 'postgres',
    port: 5432,
  },
  test: {
    username: 'postgres',
    password: 'secret',
    database: 'bingleshop',
    host: 'bingleshop-postgres',
    dialect: 'postgres',
    port: 5432,
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT,
  },
};

