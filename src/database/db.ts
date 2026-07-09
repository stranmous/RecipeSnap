/**
 * SQLite Database — Recipe storage with expo-sqlite
 */

import * as SQLite from "expo-sqlite";
import { Recipe } from "@/types/recipe";

let database: SQLite.SQLiteDatabase | null = null;

/**
 * Get or initialize the database connection
 */
function getDb(): SQLite.SQLiteDatabase {
  if (!database) {
    database = SQLite.openDatabaseSync("recipesnap.db");
  }
  return database;
}

/**
 * Initialize the database schema
 * Call this once on app startup
 */
export async function initDatabase(): Promise<void> {
  const db = getDb();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS recipes (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      cuisine TEXT,
      estimatedTime TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      steps TEXT NOT NULL,
      summary TEXT,
      imageUri TEXT,
      createdAt TEXT NOT NULL
    );
  `);
}

/**
 * Insert a new recipe into the database
 */
export async function insertRecipe(recipe: Recipe): Promise<void> {
  const db = getDb();
  await db.runAsync(
    `INSERT OR REPLACE INTO recipes (id, title, cuisine, estimatedTime, ingredients, steps, summary, imageUri, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      recipe.id,
      recipe.title,
      recipe.cuisine,
      recipe.estimatedTime,
      JSON.stringify(recipe.ingredients),
      JSON.stringify(recipe.steps),
      recipe.summary,
      recipe.imageUri,
      recipe.createdAt,
    ]
  );
}

/**
 * Get all recipes ordered by creation date (newest first)
 */
export async function getAllRecipes(): Promise<Recipe[]> {
  const db = getDb();
  const rows = await db.getAllAsync<{
    id: string;
    title: string;
    cuisine: string | null;
    estimatedTime: string;
    ingredients: string;
    steps: string;
    summary: string | null;
    imageUri: string | null;
    createdAt: string;
  }>("SELECT * FROM recipes ORDER BY createdAt DESC");

  return rows.map(parseRecipeRow);
}

/**
 * Get a single recipe by ID
 */
export async function getRecipeById(id: string): Promise<Recipe | null> {
  const db = getDb();
  const row = await db.getFirstAsync<{
    id: string;
    title: string;
    cuisine: string | null;
    estimatedTime: string;
    ingredients: string;
    steps: string;
    summary: string | null;
    imageUri: string | null;
    createdAt: string;
  }>("SELECT * FROM recipes WHERE id = ?", [id]);

  if (!row) return null;
  return parseRecipeRow(row);
}

/**
 * Get the most recent recipes (for home screen)
 */
export async function getRecentRecipes(limit: number = 3): Promise<Recipe[]> {
  const db = getDb();
  const rows = await db.getAllAsync<{
    id: string;
    title: string;
    cuisine: string | null;
    estimatedTime: string;
    ingredients: string;
    steps: string;
    summary: string | null;
    imageUri: string | null;
    createdAt: string;
  }>("SELECT * FROM recipes ORDER BY createdAt DESC LIMIT ?", [limit]);

  return rows.map(parseRecipeRow);
}

/**
 * Search recipes by title
 */
export async function searchRecipes(query: string): Promise<Recipe[]> {
  const db = getDb();
  const rows = await db.getAllAsync<{
    id: string;
    title: string;
    cuisine: string | null;
    estimatedTime: string;
    ingredients: string;
    steps: string;
    summary: string | null;
    imageUri: string | null;
    createdAt: string;
  }>("SELECT * FROM recipes WHERE title LIKE ? ORDER BY createdAt DESC", [
    `%${query}%`,
  ]);

  return rows.map(parseRecipeRow);
}

/**
 * Delete a recipe by ID
 */
export async function deleteRecipe(id: string): Promise<void> {
  const db = getDb();
  await db.runAsync("DELETE FROM recipes WHERE id = ?", [id]);
}

/**
 * Parse a database row into a Recipe object
 */
function parseRecipeRow(row: {
  id: string;
  title: string;
  cuisine: string | null;
  estimatedTime: string;
  ingredients: string;
  steps: string;
  summary: string | null;
  imageUri: string | null;
  createdAt: string;
}): Recipe {
  return {
    id: row.id,
    title: row.title,
    cuisine: row.cuisine,
    estimatedTime: row.estimatedTime,
    ingredients: JSON.parse(row.ingredients),
    steps: JSON.parse(row.steps),
    summary: row.summary || "",
    imageUri: row.imageUri || "",
    createdAt: row.createdAt,
  };
}
