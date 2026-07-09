/**
 * Home Screen — RecipeSnap
 * Landing page with scan/upload CTAs and recent scans carousel
 */

import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";

import { Button } from "@/components/ui/Button";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { SkeletonRecipeCard } from "@/components/ui/SkeletonLoader";
import { useScanStore } from "@/store/useScanStore";
import { useHistoryStore } from "@/store/useHistoryStore";
import { pickFromCamera, pickFromGallery } from "@/services/imagePicker";
import { Colors } from "@/constants/colors";
import { Recipe } from "@/types/recipe";

export default function HomeScreen() {
  const router = useRouter();
  const setImage = useScanStore((s) => s.setImage);
  const reset = useScanStore((s) => s.reset);
  const loadRecentRecipes = useHistoryStore((s) => s.loadRecentRecipes);

  const [recentScans, setRecentScans] = useState<Recipe[]>([]);
  const [isLoadingRecent, setIsLoadingRecent] = useState(true);

  // Load recent scans when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      async function load() {
        setIsLoadingRecent(true);
        const recipes = await loadRecentRecipes(5);
        if (isActive) {
          setRecentScans(recipes);
          setIsLoadingRecent(false);
        }
      }
      load();
      return () => {
        isActive = false;
      };
    }, [])
  );

  const handleScanRecipe = async () => {
    reset();
    const result = await pickFromCamera();
    if (result) {
      setImage(result.uri);
      router.push("/scanner");
    }
  };

  const handleUploadFromGallery = async () => {
    reset();
    const result = await pickFromGallery();
    if (result) {
      setImage(result.uri);
      router.push("/scanner");
    }
  };

  const handleRecipePress = (id: string) => {
    router.push(`/result/${id}`);
  };

  const handleViewAllScans = () => {
    router.push("/history");
  };

  const handleSettingsPress = () => {
    router.push("/settings");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-4 pt-6">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
          {/* Logo */}
          <View className="flex-row items-center gap-3">
            <View
              className="w-12 h-12 rounded-full items-center justify-center overflow-hidden"
              style={{
                backgroundColor: Colors.cardSurface,
                borderWidth: 1,
                borderColor: Colors.whiteAlpha5,
              }}
            >
              <Text className="text-2xl">🍴</Text>
            </View>
            <Text
              className="text-xl text-primary"
              style={{ fontFamily: "Inter-Bold", letterSpacing: -0.5 }}
            >
              RecipeSnap
            </Text>
          </View>

          {/* Settings Button */}
          <Pressable
            onPress={handleSettingsPress}
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{
              backgroundColor: Colors.surface,
              borderWidth: 1,
              borderColor: Colors.whiteAlpha5,
            }}
          >
            <Text className="text-on-surface text-lg">⚙️</Text>
          </Pressable>
        </View>

        {/* Hero Section */}
        <View className="items-center mb-10">
          <Text
            className="text-on-surface text-center mb-8"
            style={{
              fontFamily: "Inter-Bold",
              fontSize: 40,
              lineHeight: 48,
              letterSpacing: -0.8,
            }}
          >
            Point. Snap.{"\n"}Cook.
          </Text>

          <View className="w-full gap-4">
            <Button
              title="Scan a Recipe"
              variant="primary"
              icon={<Text className="text-lg">📷</Text>}
              onPress={handleScanRecipe}
            />
            <Button
              title="Upload from Gallery"
              variant="secondary"
              icon={<Text className="text-lg">🖼️</Text>}
              onPress={handleUploadFromGallery}
            />
          </View>
        </View>

        {/* Recent Scans Section */}
        <View className="flex-1">
          <View className="flex-row justify-between items-end mb-4 px-1">
            <Text
              className="text-on-surface"
              style={{ fontFamily: "Inter-SemiBold", fontSize: 24 }}
            >
              Recent Scans
            </Text>
            {recentScans.length > 0 && (
              <Pressable
                onPress={handleViewAllScans}
                className="flex-row items-center"
              >
                <Text
                  className="text-secondary"
                  style={{
                    fontFamily: "Inter-SemiBold",
                    fontSize: 12,
                    letterSpacing: 0.6,
                    textTransform: "uppercase",
                  }}
                >
                  View All Scans →
                </Text>
              </Pressable>
            )}
          </View>

          {isLoadingRecent ? (
            /* Skeleton loading state */
            <View className="flex-row gap-4">
              <SkeletonRecipeCard />
              <SkeletonRecipeCard />
            </View>
          ) : recentScans.length > 0 ? (
            /* Recipe cards horizontal scroll */
            <FlatList
              data={recentScans}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 16, paddingRight: 16 }}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <RecipeCard
                  id={item.id}
                  title={item.title}
                  estimatedTime={item.estimatedTime}
                  imageUri={item.imageUri || undefined}
                  onPress={handleRecipePress}
                />
              )}
            />
          ) : (
            /* Empty state */
            <View
              className="items-center justify-center py-12 rounded-2xl"
              style={{
                backgroundColor: Colors.surface,
                borderWidth: 1,
                borderColor: Colors.whiteAlpha5,
              }}
            >
              <Text className="text-4xl mb-3">📸</Text>
              <Text
                className="text-on-surface-variant text-center"
                style={{ fontFamily: "Inter-Medium", fontSize: 16 }}
              >
                No scans yet
              </Text>
              <Text
                className="text-on-surface-variant text-center mt-1 opacity-60"
                style={{ fontFamily: "Inter-Regular", fontSize: 14 }}
              >
                Scan or upload a recipe to get started!
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
