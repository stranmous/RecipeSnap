/**
 * Gemini Vision API Client
 * Sends recipe images to Google Gemini for AI-powered extraction
 */

import { GeminiResponse, GeminiRecipeResponse } from "@/types/recipe";
import { RECIPE_EXTRACTION_PROMPT } from "./prompts";

const GEMINI_API_BASE =
  "https://generativelanguage.googleapis.com/v1beta/models";
const MODEL = "gemini-2.5-flash";

interface GeminiAPIResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message: string;
    code: number;
  };
}

/**
 * Send an image to Gemini Vision API and extract recipe data
 */
export async function analyzeRecipeImage(
  base64Image: string
): Promise<GeminiResponse> {
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing Gemini API Key. Ensure EXPO_PUBLIC_GEMINI_API_KEY is set in .env");
  }

  const url = `${GEMINI_API_BASE}/${MODEL}:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: RECIPE_EXTRACTION_PROMPT },
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: base64Image,
            },
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 4096,
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.error?.message || `API request failed (${response.status})`;
      throw new Error(errorMessage);
    }

    const data: GeminiAPIResponse = await response.json();

    // Extract text from response
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error("No response received from Gemini");
    }

    // Parse JSON from response (handle potential markdown code blocks)
    const parsed = parseGeminiJSON(text);
    return parsed;
  } catch (error) {
    if (error instanceof Error) {
      // Retry once on network errors
      if (
        error.message.includes("network") ||
        error.message.includes("fetch")
      ) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return analyzeRecipeImage(base64Image);
      }
      throw error;
    }
    throw new Error("An unexpected error occurred while analyzing the recipe");
  }
}

/**
 * Parse JSON from Gemini response text
 * Handles cases where JSON is wrapped in markdown code blocks
 */
function parseGeminiJSON(text: string): GeminiResponse {
  let cleanText = text.trim();

  // Remove markdown code block wrapper if present
  if (cleanText.startsWith("```json")) {
    cleanText = cleanText.slice(7);
  } else if (cleanText.startsWith("```")) {
    cleanText = cleanText.slice(3);
  }
  if (cleanText.endsWith("```")) {
    cleanText = cleanText.slice(0, -3);
  }
  cleanText = cleanText.trim();

  try {
    const parsed = JSON.parse(cleanText);

    // Validate the response has required fields
    if ("error" in parsed) {
      return { error: parsed.error };
    }

    if (!parsed.title || !parsed.ingredients || !parsed.steps) {
      return { error: "Incomplete recipe data extracted" };
    }

    // Ensure arrays are actually arrays
    const recipe: GeminiRecipeResponse = {
      title: String(parsed.title),
      cuisine: parsed.cuisine ? String(parsed.cuisine) : null,
      estimatedTime: String(parsed.estimatedTime || "Unknown"),
      ingredients: Array.isArray(parsed.ingredients)
        ? parsed.ingredients.map(String)
        : [],
      steps: Array.isArray(parsed.steps) ? parsed.steps.map(String) : [],
      summary: String(parsed.summary || ""),
    };

    return recipe;
  } catch {
    // Try to extract JSON from the text if direct parsing fails
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch {
        // Fall through to error
      }
    }
    return { error: "Failed to parse recipe data from AI response" };
  }
}
