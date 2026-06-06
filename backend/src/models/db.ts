import { Pool } from "pg";

export const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "students",
  password: "password",
  port: 5432
});