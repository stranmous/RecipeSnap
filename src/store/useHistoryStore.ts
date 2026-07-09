/**
 * History Store — Zustand state for recipe scan history
 */

import { create } from "zustand";
import { Recipe } from "@/types/recipe";
import * as db from "@/database/db";

interface HistoryState {
  /** All recipes from database */
  recipes: Recipe[];
  /** Current search query */
  searchQuery: string;
  /** Whether recipes are loading */
  isLoading: boolean;

  // Actions
  setSearchQuery: (query: string) => void;
  loadRecipes: () => Promise<void>;
  loadRecentRecipes: (limit?: number) => Promise<Recipe[]>;
  deleteRecipe: (id: string) => Promise<void>;
  addRecipe: (recipe: Recipe) => Promise<void>;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  recipes: [],
  searchQuery: "",
  isLoading: false,

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    // Trigger filtered search
    if (query.trim()) {
      db.searchRecipes(query).then((recipes) => set({ recipes }));
    } else {
      db.getAllRecipes().then((recipes) => set({ recipes }));
    }
  },

  loadRecipes: async () => {
    set({ isLoading: true });
    try {
      const recipes = await db.getAllRecipes();
      set({ recipes, isLoading: false });
    } catch (error) {
      console.error("Failed to load recipes:", error);
      set({ isLoading: false });
    }
  },

  loadRecentRecipes: async (limit = 3) => {
    try {
      return await db.getRecentRecipes(limit);
    } catch (error) {
      console.error("Failed to load recent recipes:", error);
      return [];
    }
  },

  deleteRecipe: async (id: string) => {
    try {
      await db.deleteRecipe(id);
      const { searchQuery } = get();
      if (searchQuery.trim()) {
        const recipes = await db.searchRecipes(searchQuery);
        set({ recipes });
      } else {
        const recipes = await db.getAllRecipes();
        set({ recipes });
      }
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
  },

  addRecipe: async (recipe: Recipe) => {
    try {
      await db.insertRecipe(recipe);
      const recipes = await db.getAllRecipes();
      set({ recipes });
    } catch (error) {
      console.error("Failed to add recipe:", error);
    }
  },
}));
