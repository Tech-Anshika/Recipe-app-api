import dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./src/db/schema.js",
  out: "./src/db/migrations",
  dialect: "postgresql", // ✅ required field
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_op7JIyDdNtu8@ep-red-star-a8904zod-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
};

