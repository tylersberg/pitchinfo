import { drizzle } from 'drizzle-orm/mysql2';
import 'dotenv/config';
import mysql from 'mysql2';

const sql = mysql.createPool({
     host: process.env.DB_HOST, 
     user: process.env.DB_USER, 
     password: process.env.DB_PASS,
     database: process.env.DB,
});
const db = drizzle(sql);
export default db;
