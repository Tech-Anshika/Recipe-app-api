import dotenv from "dotenv";
dotenv.config();

export default {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 5001,
  NODE_ENV: process.env.NODE_ENV || "development",
};

