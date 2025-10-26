# 🍽️ YumVerse - Vegetarian Recipe Discovery App

[![React Native](https://img.shields.io/badge/React%20Native-v0.76-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-v52-000020.svg)](https://expo.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A beautiful, modern mobile application for discovering and saving delicious vegetarian recipes. Built with React Native, Expo, and powered by Spoonacular API.

## ✨ Features

### 🔍 Recipe Discovery
- **Search Recipes** - Find recipes by name with real-time search
- **Category Filters** - Browse by Salad, Soup, Pasta, Dessert, Breakfast, Indian, and more
- **Random Recipes** - Discover new recipes with a single tap
- **Recipe Details** - View ingredients, instructions, prep time, servings, and video tutorials

### ❤️ Favorites Management
- **Save Recipes** - Bookmark your favorite recipes for quick access
- **Sync Across Sessions** - Favorites are stored in a PostgreSQL database
- **Auto-Refresh** - Favorites list updates automatically when you navigate back
- **Easy Management** - Add or remove favorites with a single tap

### 🔐 Authentication
- **Secure Sign Up/Sign In** - Powered by Clerk authentication
- **Email Verification** - Verify your email for added security
- **Session Management** - Stay logged in across app sessions
- **Logout** - Secure logout from the app

### 🎨 Modern UI/UX
- **Beautiful Gradients** - Eye-catching color schemes throughout
- **Smooth Animations** - Polished transitions and interactions
- **Responsive Design** - Optimized for all screen sizes
- **Dark Theme Ready** - Modern color palette with proper contrast

## 🛠️ Tech Stack

### Frontend (Mobile App)
- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and build tools
- **Expo Router** - File-based routing system
- **Clerk** - Authentication and user management
- **Expo Image** - Optimized image loading
- **Linear Gradient** - Beautiful gradient backgrounds
- **React Native WebView** - Embedded YouTube video tutorials

### Backend (API Server)
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **PostgreSQL** - Relational database (via Neon)
- **Drizzle ORM** - Type-safe database toolkit
- **Cron** - Scheduled tasks management
- **CORS** - Cross-origin resource sharing

### External APIs
- **Spoonacular API** - Recipe data and search
- **Clerk API** - User authentication

## 📁 Project Structure

```
project-3/
├── backend/                    # Node.js backend server
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   │   ├── db.js          # Database connection
│   │   │   ├── env.js         # Environment variables
│   │   │   └── cron.js        # Cron jobs
│   │   ├── db/
│   │   │   ├── migrations/    # Database migrations
│   │   │   └── schema.js      # Database schema
│   │   ├── server.js          # Express server
│   │   └── migrate.js         # Migration runner
│   ├── package.json
│   └── drizzle.config.js
│
└── mobile/YumVerse/           # React Native mobile app
    ├── app/                   # File-based routing
    │   ├── (auth)/           # Authentication screens
    │   │   ├── sign-in.jsx
    │   │   ├── sign-up.jsx
    │   │   └── verify-email.jsx
    │   ├── (tabs)/           # Bottom tab screens
    │   │   ├── index.jsx     # Home screen
    │   │   ├── search.jsx    # Search screen
    │   │   └── favorites.jsx # Favorites screen
    │   └── recipe/           # Recipe detail
    │       └── [id].jsx
    ├── components/            # Reusable components
    ├── services/             # API services
    ├── constants/            # App constants
    ├── hooks/                # Custom hooks
    └── assets/               # Images, fonts, styles
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL Database** (Neon recommended)
- **Expo CLI** - `npm install -g expo-cli`
- **Spoonacular API Key** - Get it from [Spoonacular](https://spoonacular.com/food-api)
- **Clerk Account** - Sign up at [Clerk](https://clerk.com/)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   DATABASE_URL=your_neon_database_url
   PORT=5001
   NODE_ENV=development
   ```

4. **Run database migration**
   ```bash
   npm run db:push
   ```

5. **Start the server**
   ```bash
   npm run dev
   ```

   Server will run on `http://localhost:5001`

### Frontend Setup

1. **Navigate to mobile directory**
   ```bash
   cd mobile/YumVerse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   EXPO_PUBLIC_SPOONACULAR_API_KEY=your_spoonacular_api_key
   ```

4. **Update API URL**
   
   Edit `constants/api.js`:
   ```javascript
   // For physical device, use your computer's IP address
   export const API_URL = "http://YOUR_IP_ADDRESS:5001/api";
   
   // For emulator/simulator
   export const API_URL = "http://localhost:5001/api";
   ```

5. **Start the app**
   ```bash
   npx expo start
   ```

6. **Run on device/emulator**
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan QR code with Expo Go app for physical device

## 📱 App Screenshots & Features

### Home Screen
- Featured recipe categories with images
- Quick access to popular recipe types
- Beautiful gradient cards
- Smooth navigation

### Search Screen
- Real-time recipe search
- Category filters (Salad, Soup, Pasta, etc.)
- Debounced search for optimal performance
- Grid layout with recipe cards

### Recipe Detail Screen
- Large hero image with gradient overlay
- Recipe title and category badge
- Preparation time and servings
- Embedded YouTube video tutorial
- Numbered ingredient list
- Step-by-step instructions
- Add/Remove from favorites

### Favorites Screen
- Grid layout of saved recipes
- Auto-refresh when navigating back
- Empty state with call-to-action
- Logout button
- Pull to refresh support

## 🔌 API Endpoints

### Favorites API

#### `POST /api/favorites`
Add a recipe to favorites
```json
{
  "userId": "string",
  "recipeId": "number",
  "title": "string",
  "image": "string",
  "cookTime": "string",
  "servings": "string"
}
```

#### `GET /api/favorites/:userId`
Get all favorites for a user

#### `DELETE /api/favorites/:userId/:recipeId`
Remove a recipe from favorites

#### `GET /api/health`
Health check endpoint

## 🗄️ Database Schema

### Favorites Table
```sql
CREATE TABLE "favorites" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL,
  "recipe_id" integer NOT NULL,
  "title" text NOT NULL,
  "image" text,
  "cook_time" text,
  "servings" text,
  "created_at" timestamp DEFAULT now()
);
```

## 🐛 Recent Fixes & Updates

### v1.1.0 - Favorites Functionality Fix
**Date:** October 26, 2025

**Critical Bug Fix:**
- ✅ Fixed database schema mismatch (INTEGER vs TEXT types)
- ✅ Updated backend to handle proper data types
- ✅ Added explicit string conversions in frontend
- ✅ Implemented auto-refresh for favorites screen
- ✅ Enhanced error handling and logging

**Technical Details:**
The favorites feature had a critical database schema mismatch where the initial migration created `user_id`, `cook_time`, and `servings` as INTEGER columns, but the schema.js and application code expected TEXT. This caused insertion failures when trying to save favorites.

**Solution:**
- Recreated database schema with correct types
- Updated all backend endpoints for proper type handling
- Added `useFocusEffect` hook for auto-refresh
- Created comprehensive migration system

For detailed information, see [FAVORITES_FIX_INSTRUCTIONS.md](./FAVORITES_FIX_INSTRUCTIONS.md)

## 🔧 Available Scripts

### Backend Scripts
```bash
npm run dev          # Start development server with nodemon
npm run start        # Start production server
npm run db:generate  # Generate migrations from schema
npm run db:migrate   # Run migrations
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio
```

### Frontend Scripts
```bash
npx expo start       # Start Expo development server
npx expo start -c    # Start with cache cleared
npm run android      # Run on Android
npm run ios          # Run on iOS
npm run web          # Run on web
```

## 🎯 Key Features Implementation

### Search with Debounce
The search functionality uses a custom `useDebounce` hook to optimize API calls:
```javascript
const debouncedSearchTerm = useDebounce(searchQuery, 500);
```

### Auto-Refresh Favorites
Favorites automatically refresh when the screen gains focus:
```javascript
useFocusEffect(
  useCallback(() => {
    loadFavorites();
  }, [loadFavorites])
);
```

### Clerk Authentication
Protected routes and user management:
```javascript
const { user } = useUser();
const { signOut } = useClerk();
```

### Recipe Transformation
Spoonacular API data is transformed for app use:
```javascript
const ingredients = meal.extendedIngredients?.map((ing) => {
  return `${ing.amount} ${ing.unit} ${ing.name}`.trim();
});
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Guidelines

### Code Style
- Use ES6+ features
- Follow React hooks best practices
- Use functional components
- Implement proper error handling
- Add meaningful comments

### Commit Messages
Follow conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions
- `chore:` Maintenance tasks

## 🔐 Environment Variables

### Backend (.env)
```env
DATABASE_URL=         # Neon PostgreSQL connection string
PORT=                 # Server port (default: 5001)
NODE_ENV=            # development | production
```

### Frontend (.env)
```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=    # Clerk authentication key
EXPO_PUBLIC_SPOONACULAR_API_KEY=      # Spoonacular API key
```

## 🚨 Troubleshooting

### Backend Issues

**Server won't start:**
- Check if DATABASE_URL is set correctly
- Ensure PostgreSQL is running
- Verify port 5001 is not in use

**Migration errors:**
- Try `npm run db:push` to sync schema
- Check database connection
- Review migration files for errors

### Frontend Issues

**Can't connect to backend:**
- Update `constants/api.js` with correct IP
- Ensure backend server is running
- Check firewall settings

**Clerk authentication fails:**
- Verify EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
- Check Clerk dashboard configuration
- Clear app data and retry

**Images not loading:**
- Check internet connection
- Verify Spoonacular API key
- Check API rate limits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

**Anshika**
- GitHub: [@Tech-Anshika](https://github.com/Tech-Anshika)
- Repository: [YumVerse](https://github.com/Tech-Anshika/YumVerse)

## 🙏 Acknowledgments

- **Spoonacular API** - For providing comprehensive recipe data
- **Clerk** - For seamless authentication
- **Expo Team** - For the amazing development platform
- **Neon** - For serverless PostgreSQL database
- **React Native Community** - For excellent documentation

## 📞 Support

If you encounter any issues or have questions:
1. Check the [FAVORITES_FIX_INSTRUCTIONS.md](./FAVORITES_FIX_INSTRUCTIONS.md)
2. Open an issue on GitHub
3. Review the troubleshooting section

## 🗺️ Roadmap

### Upcoming Features
- [ ] Recipe comments and ratings
- [ ] Social sharing functionality
- [ ] Meal planning calendar
- [ ] Shopping list generator
- [ ] Nutritional information display
- [ ] Recipe collections/folders
- [ ] Offline mode support
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Recipe submission by users

---

**Made with ❤️ by Anshika**

*Happy Cooking! 🍳*

