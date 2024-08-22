import 'dotenv/config'
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DB_HOST!,
    port: process.env.DB_PORT!,
    database: process.env.DB!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASS!,
  },
});
