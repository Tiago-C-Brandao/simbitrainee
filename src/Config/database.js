require('dotenv').config()

module.exports = {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // O Port foi adicionado no DotEnv antes não existia
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    define: {
      timestamps: true,
      underscored: true,
    }
  }