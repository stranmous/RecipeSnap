/**
 * Scanner Screen — RecipeSnap
 * Previews the selected image and handles the Gemini AI analysis
 */

import { useEffect } from "react";
import { View, Text, Image, SafeAreaView, Alert } from "react-native";
import { useRouter } from "expo-router";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
import { useScanStore } from "@/store/useScanStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useHistoryStore } from "@/store/useHistoryStore";
import { processImageToBase64 } from "@/services/imageProcessor";
import { analyzeRecipeImage } from "@/services/gemini";
import { Colors } from "@/constants/colors";
import { isGeminiError, Recipe } from "@/types/recipe";

export default function ScannerScreen() {
  const router = useRouter();
  const { imageUri, isProcessing, error, startProcessing, setResult, setError } =
    useScanStore();
  const addRecipe = useHistoryStore((s) => s.addRecipe);

  // If no image is selected, go back
  useEffect(() => {
    if (!imageUri && !isProcessing && !error) {
      router.replace("/");
    }
  }, [imageUri, isProcessing, error, router]);

  const handleAnalyze = async () => {
    if (!imageUri) return;

    startProcessing();

    try {
      // 1. Process image (resize, compress, base64)
      const base64Image = await processImageToBase64(imageUri);

      // 2. Call Gemini API
      const response = await analyzeRecipeImage(base64Image);

      if (isGeminiError(response)) {
        setError(response.error);
        return;
      }

      // 3. Create Recipe object
      const newRecipe: Recipe = {
        id: uuidv4(),
        title: response.title,
        cuisine: response.cuisine,
        estimatedTime: response.estimatedTime,
        ingredients: response.ingredients,
        steps: response.steps,
        summary: response.summary,
        imageUri: imageUri,
        createdAt: new Date().toISOString(),
      };

      // 4. Save to database via History Store
      await addRecipe(newRecipe);

      // 5. Update Scan Store and Navigate
      setResult(newRecipe);
      router.replace(`/result/${newRecipe.id}`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
    }
  };

  const handleRetake = () => {
    router.replace("/");
  };

  if (!imageUri) return null;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1">
        {/* Full-screen Image Preview */}
        <Image
          source={{ uri: imageUri }}
          className="absolute w-full h-full"
          resizeMode="cover"
        />

        {/* Gradient Overlay for better text visibility */}
        <View
          className="absolute w-full h-full"
          style={{ backgroundColor: "rgba(20, 19, 15, 0.4)" }}
        />

        {/* Header - Back button */}
        <View className="pt-6 px-4">
          <Button
            title="Back"
            variant="ghost"
            onPress={handleRetake}
            icon={<Text className="text-on-surface-variant text-xl">←</Text>}
          />
        </View>

        {/* Bottom Sheet Area */}
        <View className="flex-1 justify-end px-4 pb-8">
          {error ? (
            <GlassPanel className="p-6 items-center">
              <Text className="text-4xl mb-4">⚠️</Text>
              <Text className="text-error font-inter-semibold text-xl mb-2 text-center">
                Analysis Failed
              </Text>
              <Text className="text-on-surface-variant text-center mb-6">
                {error}
              </Text>
              <View className="w-full gap-3">
                <Button title="Try Again" onPress={handleAnalyze} />
                <Button
                  title="Choose Different Image"
                  variant="secondary"
                  onPress={handleRetake}
                />
              </View>
            </GlassPanel>
          ) : isProcessing ? (
            <GlassPanel className="p-6 items-center">
              <SkeletonLoader width={80} height={80} borderRadius={40} className="mb-4" />
              <Text className="text-brand-orange font-inter-semibold text-xl mb-2">
                Analyzing your recipe...
              </Text>
              <Text className="text-on-surface-variant text-center mb-6">
                Gemini AI is reading the ingredients and steps. This usually takes
                a few seconds.
              </Text>
              <SkeletonLoader width="100%" height={16} className="mb-2" />
              <SkeletonLoader width="80%" height={16} className="mb-2" />
              <SkeletonLoader width="90%" height={16} />
            </GlassPanel>
          ) : (
            <GlassPanel className="p-6">
              <Text className="text-text-cream font-inter-semibold text-2xl mb-2 text-center">
                Ready to Scan
              </Text>
              <Text className="text-on-surface-variant text-center mb-6">
                Make sure the recipe text is visible and legible.
              </Text>
              <View className="w-full gap-3">
                <Button
                  title="✨ Analyze Recipe"
                  onPress={handleAnalyze}
                />
                <Button
                  title="Retake Photo"
                  variant="ghost"
                  onPress={handleRetake}
                />
              </View>
            </GlassPanel>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
