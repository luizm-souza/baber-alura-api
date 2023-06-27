require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'mysql'
  }
};