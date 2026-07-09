/**
 * Recipe Result Screen — RecipeSnap
 * Displays the full AI-extracted recipe details
 */

import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Pressable, SafeAreaView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useHistoryStore } from "@/store/useHistoryStore";
import { useScanStore } from "@/store/useScanStore";
import { Recipe } from "@/types/recipe";
import { Colors } from "@/constants/colors";

import { RecipeActions } from "@/components/recipe/RecipeActions";
import { IngredientsList } from "@/components/recipe/IngredientsList";
import { StepsList } from "@/components/recipe/StepsList";
import { AISummary } from "@/components/recipe/AISummary";

export default function RecipeResultScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const historyRecipes = useHistoryStore((s) => s.recipes);
  const scanResult = useScanStore((s) => s.result);

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    // Check if it's the current active scan first
    if (scanResult && scanResult.id === id) {
      setRecipe(scanResult);
      return;
    }

    // Otherwise find in history
    const found = historyRecipes.find((r) => r.id === id);
    if (found) {
      setRecipe(found);
    }
  }, [id, historyRecipes, scanResult]);

  const handleBack = () => {
    // If coming from a new scan, go home instead of back to scanner
    if (scanResult && scanResult.id === id) {
      router.replace("/");
    } else {
      router.back();
    }
  };

  if (!recipe) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <Text className="text-on-surface-variant">Recipe not found.</Text>
        <Pressable onPress={handleBack} className="mt-4 p-2">
          <Text className="text-brand-teal font-inter-semibold">Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Sticky Header */}
      <View className="flex-row items-center justify-between px-4 py-3 z-10 bg-background">
        <Pressable
          onPress={handleBack}
          className="w-10 h-10 items-center justify-center -ml-2 rounded-full"
          style={{ backgroundColor: Colors.surface }}
        >
          <Text className="text-on-surface-variant text-xl">←</Text>
        </Pressable>
        <Text
          className="text-text-cream text-lg"
          style={{ fontFamily: "Inter-Bold", letterSpacing: -0.5 }}
        >
          RecipeSnap
        </Text>
        <View className="w-10 h-10" /> {/* Spacer for alignment */}
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero Image */}
        <View className="w-full h-64 mb-6">
          {recipe.imageUri ? (
            <Image
              source={{ uri: recipe.imageUri }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-full bg-card-surface items-center justify-center border-b border-white/5">
              <Text className="text-5xl">🍲</Text>
            </View>
          )}

          {/* Gradient Overlay for bottom text fade */}
          <View
            className="absolute bottom-0 left-0 right-0 h-1/2"
            style={{
              backgroundColor: "transparent",
              backgroundImage:
                "linear-gradient(to top, rgba(20, 19, 15, 1), transparent)",
            }}
          />
          {/* Fallback overlay since NativeWind gradients can be tricky on native */}
          <View
            className="absolute bottom-0 left-0 right-0 h-1/2"
            style={{ backgroundColor: "rgba(20, 19, 15, 0.6)" }}
          />
          <View
            className="absolute bottom-0 left-0 right-0 h-1/4"
            style={{ backgroundColor: "rgba(20, 19, 15, 0.85)" }}
          />
        </View>

        <View className="px-4">
          {/* Title and Chips */}
          <View className="mb-6">
            <Text
              className="text-text-cream mb-4"
              style={{
                fontFamily: "Inter-Bold",
                fontSize: 32,
                lineHeight: 40,
                letterSpacing: -0.32,
              }}
            >
              {recipe.title}
            </Text>

            <View className="flex-row flex-wrap gap-2">
              <View
                className="flex-row items-center px-3 py-1.5 rounded-lg"
                style={{
                  backgroundColor: Colors.surfaceHigh,
                  borderWidth: 1,
                  borderColor: Colors.whiteAlpha5,
                }}
              >
                <Text className="text-xs mr-1.5">🕐</Text>
                <Text className="text-on-surface-variant font-inter-semibold text-xs tracking-wider uppercase">
                  {recipe.estimatedTime}
                </Text>
              </View>

              {recipe.cuisine && (
                <View
                  className="flex-row items-center px-3 py-1.5 rounded-lg"
                  style={{
                    backgroundColor: Colors.surfaceHigh,
                    borderWidth: 1,
                    borderColor: Colors.whiteAlpha5,
                  }}
                >
                  <Text className="text-xs mr-1.5">🌍</Text>
                  <Text className="text-on-surface-variant font-inter-semibold text-xs tracking-wider uppercase">
                    {recipe.cuisine}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* AI Summary */}
          {recipe.summary && (
            <View className="mb-8">
              <AISummary summary={recipe.summary} />
            </View>
          )}

          {/* Ingredients */}
          <View className="mb-8">
            <IngredientsList ingredients={recipe.ingredients} />
          </View>

          {/* Steps */}
          <View className="mb-4">
            <StepsList steps={recipe.steps} />
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Action Bar */}
      <RecipeActions recipe={recipe} />
    </SafeAreaView>
  );
}
