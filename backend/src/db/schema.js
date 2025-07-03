// ✅ schema.js
// backend/src/db/schema.js
// backend/src/db/schema.js
import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const favoritesTable = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  recipeId: integer("recipe_id").notNull(),
  title: text("title"),
  image: text("image"),
  cookTime: integer("cook_time"),          // 🔁 FIXED
  servings: integer("servings"),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow() // 🔁 FIXED
});



// ✅ Export your table(s)
export const schema = {
  favoritesTable,
};
