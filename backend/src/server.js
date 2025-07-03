import express from "express";
import env from "./config/env.js";
import { db } from "./config/db.js";
import { favoritesTable } from "./db/schema.js";
import { eq, and } from "drizzle-orm"; // ✅ required

const app = express();
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// Add favorite
app.post("/api/favorites", async (req, res) => {
  try {
    const { userId, recipeId, title, image, cookTime, servings } = req.body;

    if (!userId || !recipeId || !title) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newFavorite = await db.insert(favoritesTable).values({
      userId: parseInt(userId),
      recipeId: parseInt(recipeId),
      title,
      image,
      cookTime: parseInt(cookTime),
      servings: parseInt(servings),
    }).returning();

    res.status(201).json(newFavorite[0]);
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// ✅ Get specific favorite
// ✅ Add this new route before :userId/:recipeId route (to avoid conflict)
app.get("/api/favorites/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const userFavorites = await db.select().from(favoritesTable).where(
      eq(favoritesTable.userId, parseInt(userId))
    );

    res.status(200).json(userFavorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


// ✅ Delete favorite
app.delete("/api/favorites/:userId/:recipeId", async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    await db.delete(favoritesTable).where(
      and(
        eq(favoritesTable.userId, parseInt(userId)),
        eq(favoritesTable.recipeId, parseInt(recipeId))
      )
    );

    res.status(200).json({ message: "Favorite deleted successfully" });
  } catch (error) {
    console.error("Error deleting favorite:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
