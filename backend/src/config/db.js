// backend/src/config/db.js

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import ENV from "./env.js"; // ✅ using default import now
import * as schema from "../db/schema.js";

const sql = neon(ENV.DATABASE_URL);
export const db = drizzle(sql, { schema });
