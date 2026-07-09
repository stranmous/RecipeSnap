/**
 * Scan Store — Zustand state for current recipe scanning session
 */

import { create } from "zustand";
import { Recipe, GeminiRecipeResponse } from "@/types/recipe";

interface ScanState {
  /** URI of the selected/captured image */
  imageUri: string | null;
  /** Whether the AI is currently processing */
  isProcessing: boolean;
  /** The extracted recipe result */
  result: Recipe | null;
  /** Error message if analysis failed */
  error: string | null;

  // Actions
  setImage: (uri: string) => void;
  startProcessing: () => void;
  setResult: (recipe: Recipe) => void;
  setError: (error: string) => void;
  reset: () => void;
}

export const useScanStore = create<ScanState>((set) => ({
  imageUri: null,
  isProcessing: false,
  result: null,
  error: null,

  setImage: (uri) =>
    set({
      imageUri: uri,
      isProcessing: false,
      result: null,
      error: null,
    }),

  startProcessing: () =>
    set({
      isProcessing: true,
      error: null,
    }),

  setResult: (recipe) =>
    set({
      result: recipe,
      isProcessing: false,
      error: null,
    }),

  setError: (error) =>
    set({
      error,
      isProcessing: false,
    }),

  reset: () =>
    set({
      imageUri: null,
      isProcessing: false,
      result: null,
      error: null,
    }),
}));
