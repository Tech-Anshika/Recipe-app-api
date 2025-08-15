const BASE_URL = "https://api.spoonacular.com/recipes";
const API_KEY = "84a9a5a12267446d91790320d4998a02"; // Replace with your Spoonacular API key

export const MealAPI = {
  // 🔍 Search vegetarian meals by name
  searchMealsByName: async (query) => {
    try {
      const response = await fetch(
        `${BASE_URL}/complexSearch?query=${encodeURIComponent(query)}&diet=vegetarian&number=10&apiKey=${API_KEY}`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("Error searching meals by name:", error);
      return [];
    }
  },

  // 🔎 Get full meal details by ID
  getMealById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}/information?apiKey=${API_KEY}`);
      const meal = await response.json();
      return meal || null;
    } catch (error) {
      console.error("Error getting meal by id:", error);
      return null;
    }
  },

  
  // ✅ Get a single random vegetarian meal
getRandomMeal: async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/random?number=1&tags=vegetarian&apiKey=${API_KEY}`
    );
    const data = await response.json();
    return data.recipes?.[0] || null;
  } catch (error) {
    console.error("Error getting random meal:", error);
    return null;
  }
},

// ✅ Get multiple random vegetarian meals
getRandomMeals: async (count = 6) => {
  try {
    const response = await fetch(
      `${BASE_URL}/random?number=${count}&tags=vegetarian&apiKey=${API_KEY}`
    );
    const data = await response.json();
    return data.recipes || [];
  } catch (error) {
    console.error("Error getting random meals:", error);
    return [];
  }
},



  // 🗂️ Mock categories for frontend filters
  getCategories: async () => {
    return [
      { strCategory: "Salad" },
      { strCategory: "Soup" },
      { strCategory: "Pasta" },
      { strCategory: "Dessert" },
      { strCategory: "Breakfast" },
      { strCategory: "Indian" },
    ];
  },

  // 🧂 Filter by main ingredient
  filterByIngredient: async (ingredient) => {
    try {
      const response = await fetch(
        `${BASE_URL}/complexSearch?includeIngredients=${encodeURIComponent(ingredient)}&diet=vegetarian&number=10&apiKey=${API_KEY}`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("Error filtering by ingredient:", error);
      return [];
    }
  },

  // 🍽️ Filter by category using dishType
   filterByCategory: async (category) => {
    try {
      const url = `${BASE_URL}/complexSearch?query=${encodeURIComponent(category)}&diet=vegetarian&number=10&apiKey=${API_KEY}`;
      console.log("Filter API URL:", url);
      const response = await fetch(url);
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("Error filtering by category:", error);
      return [];
    }
  }, // ✅ COMMA is required here




  // 🔧 Transform Spoonacular meal data to app format
  transformMealData: (meal) => {
    if (!meal) return null;

    const ingredients = meal.extendedIngredients?.map((ing) => {
      const amount = ing.amount || "";
      const unit = ing.unit || "";
      const name = ing.name || "";
      return `${amount} ${unit} ${name}`.trim();
    }) || [];

    const instructions = meal.analyzedInstructions?.[0]?.steps?.map((s) => s.step) || [];

    return {
      id: meal.id,
      title: meal.title,
      description: meal.summary
        ? meal.summary.replace(/<[^>]+>/g, "").substring(0, 120) + "..."
        : "Delicious vegetarian meal",
      image: meal.image,
      cookTime: `${meal.readyInMinutes || 30} minutes`,
      servings: meal.servings || 2,
      category: meal.dishTypes?.[0] || "Main Course",
      area: meal.cuisines?.[0] || "Vegetarian",
      ingredients,
      instructions,
      originalData: meal,
    };
  },
};
