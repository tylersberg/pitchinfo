import { drizzle } from 'drizzle-orm/mysql2';
import mariadb from 'mariadb';

const sql = await mariadb.createConnection({
     host: process.env.DB_HOST, 
     user: process.env.DB_USER, 
     password: process.env.DB_PASS,
});
const db = drizzle(sql);
export default db;
