import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2';
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'test',
    port: process.env.DB_PORT || '3306',
});

import { buildApp } from './app.js';
var app = buildApp({ pool });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});
