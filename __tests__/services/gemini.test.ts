import { analyzeRecipeImage } from "@/services/gemini";
import { isGeminiError } from "@/types/recipe";

// Mock fetch globally
global.fetch = jest.fn();

describe("Gemini API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("successfully parses valid recipe JSON from Gemini response", async () => {
    const mockRecipeResponse = {
      title: "Test Recipe",
      cuisine: "Italian",
      estimatedTime: "30 mins",
      ingredients: ["1 cup flour", "2 eggs"],
      steps: ["Step 1", "Step 2"],
      summary: "A test recipe summary.",
    };

    const mockApiResponse = {
      candidates: [
        {
          content: {
            parts: [
              {
                text: JSON.stringify(mockRecipeResponse),
              },
            ],
          },
        },
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const result = await analyzeRecipeImage("base64string", "test-api-key");
    
    expect(isGeminiError(result)).toBe(false);
    if (!isGeminiError(result)) {
      expect(result.title).toBe("Test Recipe");
      expect(result.ingredients.length).toBe(2);
      expect(result.steps.length).toBe(2);
    }
  });

  it("handles malformed JSON enclosed in markdown code blocks", async () => {
    const mockRecipeResponse = {
      title: "Test Recipe Markdown",
      cuisine: null,
      estimatedTime: "1 hr",
      ingredients: ["Apples"],
      steps: ["Eat them"],
      summary: "Simple.",
    };

    const mockApiResponse = {
      candidates: [
        {
          content: {
            parts: [
              {
                text: "```json\n" + JSON.stringify(mockRecipeResponse) + "\n```",
              },
            ],
          },
        },
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const result = await analyzeRecipeImage("base64string", "test-api-key");
    
    expect(isGeminiError(result)).toBe(false);
    if (!isGeminiError(result)) {
      expect(result.title).toBe("Test Recipe Markdown");
    }
  });

  it("returns error object when API responds with an error", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({
        error: { message: "Invalid API key" }
      }),
    });

    await expect(analyzeRecipeImage("base64string", "bad-key"))
      .rejects.toThrow("Invalid API key");
  });

  it("retries once on network failure", async () => {
    (global.fetch as jest.Mock)
      .mockRejectedValueOnce(new Error("network error"))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          candidates: [{ content: { parts: [{ text: JSON.stringify({
            title: "Success", ingredients: [], steps: []
          }) }] } }]
        }),
      });

    const result = await analyzeRecipeImage("base64string", "key");
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(isGeminiError(result)).toBe(false);
  });
});
