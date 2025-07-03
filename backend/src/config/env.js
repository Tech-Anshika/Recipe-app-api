import "dotenv/config";

const env = {
  PORT: process.env.PORT || 5001,
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
};

export default env;
