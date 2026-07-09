/**
 * RecipeSnap Type Definitions
 */

export interface Recipe {
  /** Unique identifier (UUID) */
  id: string;
  /** Recipe name extracted by AI */
  title: string;
  /** Cuisine type (e.g. "Italian", "Indian") or null */
  cuisine: string | null;
  /** Estimated cooking time (e.g. "30 minutes") */
  estimatedTime: string;
  /** List of ingredients */
  ingredients: string[];
  /** Step-by-step cooking instructions */
  steps: string[];
  /** AI-generated summary (2-3 sentences) */
  summary: string;
  /** Local file URI of the scanned image */
  imageUri: string;
  /** ISO timestamp of when the scan was created */
  createdAt: string;
}

export interface GeminiRecipeResponse {
  title: string;
  cuisine: string | null;
  estimatedTime: string;
  ingredients: string[];
  steps: string[];
  summary: string;
}

export interface GeminiErrorResponse {
  error: string;
}

export type GeminiResponse = GeminiRecipeResponse | GeminiErrorResponse;

export function isGeminiError(
  response: GeminiResponse
): response is GeminiErrorResponse {
  return "error" in response;
}
