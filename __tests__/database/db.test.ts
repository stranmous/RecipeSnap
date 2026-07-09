import * as SQLite from "expo-sqlite";
import {
  initDatabase,
  insertRecipe,
  getAllRecipes,
  getRecipeById,
  deleteRecipe,
  searchRecipes,
  getRecentRecipes
} from "@/database/db";

// Mock expo-sqlite
jest.mock("expo-sqlite", () => {
  const mockDb = {
    execAsync: jest.fn().mockResolvedValue(true),
    runAsync: jest.fn().mockResolvedValue({ changes: 1 }),
    getAllAsync: jest.fn(),
    getFirstAsync: jest.fn(),
  };
  return {
    openDatabaseSync: jest.fn(() => mockDb),
  };
});

describe("Database Service", () => {
  let mockDb: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDb = SQLite.openDatabaseSync("recipesnap.db");
  });

  const sampleRecipe = {
    id: "123",
    title: "Pancakes",
    cuisine: "American",
    estimatedTime: "15 min",
    ingredients: ["Flour", "Milk", "Eggs"],
    steps: ["Mix", "Cook"],
    summary: "Tasty pancakes",
    imageUri: "file://image.jpg",
    createdAt: "2024-01-01T00:00:00Z"
  };

  const sampleRow = {
    id: "123",
    title: "Pancakes",
    cuisine: "American",
    estimatedTime: "15 min",
    ingredients: JSON.stringify(["Flour", "Milk", "Eggs"]),
    steps: JSON.stringify(["Mix", "Cook"]),
    summary: "Tasty pancakes",
    imageUri: "file://image.jpg",
    createdAt: "2024-01-01T00:00:00Z"
  };

  it("initializes database schema", async () => {
    await initDatabase();
    expect(mockDb.execAsync).toHaveBeenCalled();
    const query = mockDb.execAsync.mock.calls[0][0];
    expect(query).toContain("CREATE TABLE IF NOT EXISTS recipes");
  });

  it("inserts a recipe", async () => {
    await insertRecipe(sampleRecipe);
    expect(mockDb.runAsync).toHaveBeenCalledWith(
      expect.stringContaining("INSERT OR REPLACE INTO recipes"),
      expect.arrayContaining([
        "123", "Pancakes", "American", "15 min",
        JSON.stringify(["Flour", "Milk", "Eggs"])
      ])
    );
  });

  it("gets all recipes", async () => {
    mockDb.getAllAsync.mockResolvedValueOnce([sampleRow]);
    const recipes = await getAllRecipes();
    expect(recipes).toHaveLength(1);
    expect(recipes[0].title).toBe("Pancakes");
    expect(recipes[0].ingredients).toEqual(["Flour", "Milk", "Eggs"]);
  });

  it("searches recipes by title", async () => {
    mockDb.getAllAsync.mockResolvedValueOnce([sampleRow]);
    await searchRecipes("Pan");
    expect(mockDb.getAllAsync).toHaveBeenCalledWith(
      expect.stringContaining("WHERE title LIKE"),
      ["%Pan%"]
    );
  });

  it("deletes a recipe", async () => {
    await deleteRecipe("123");
    expect(mockDb.runAsync).toHaveBeenCalledWith(
      expect.stringContaining("DELETE FROM recipes WHERE id = ?"),
      ["123"]
    );
  });
});
