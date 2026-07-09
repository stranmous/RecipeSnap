import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { RecipeCard } from "@/components/recipe/RecipeCard";

describe("RecipeCard Component", () => {
  it("renders recipe details correctly", () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <RecipeCard
        id="123"
        title="Spaghetti Bolognese"
        estimatedTime="45 mins"
        imageUri="file:///image.jpg"
        onPress={mockOnPress}
      />
    );

    expect(getByText("Spaghetti Bolognese")).toBeTruthy();
    expect(getByText("45 mins")).toBeTruthy();
  });

  it("calls onPress with the recipe id when tapped", () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <RecipeCard
        id="456"
        title="Chicken Salad"
        estimatedTime="15 mins"
        onPress={mockOnPress}
      />
    );

    const card = getByText("Chicken Salad");
    fireEvent.press(card);
    
    expect(mockOnPress).toHaveBeenCalledWith("456");
  });

  it("shows placeholder when imageUri is missing", () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <RecipeCard
        id="789"
        title="No Image Recipe"
        estimatedTime="10 mins"
        onPress={mockOnPress}
      />
    );

    expect(getByText("No photo")).toBeTruthy();
  });
});
