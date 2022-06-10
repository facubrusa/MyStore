require('dotenv').config({ path: './config/.env' });

const config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3001,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
};

module.exports = { config };
