// backend/src/config/db.js
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import env from "./env.js"; // ✅ default import
import { favoritesTable } from "../db/schema.js"; // ✅ named import

const sql = neon(env.DB_URL);
export const db = drizzle(sql, {
  schema: { favoritesTable },
});
