/**
 * History Screen — RecipeSnap
 * Displays all past scanned recipes with search functionality
 */

import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  SafeAreaView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useHistoryStore } from "@/store/useHistoryStore";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";
import { Colors } from "@/constants/colors";

export default function HistoryScreen() {
  const router = useRouter();
  const { recipes, searchQuery, setSearchQuery, loadRecipes, deleteRecipe } =
    useHistoryStore();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  // Debounce search query updates
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [localSearch, setSearchQuery]);

  const handleBack = () => {
    router.back();
  };

  const handleRecipePress = (id: string) => {
    router.push(`/result/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteRecipe(id);
  };

  const handleScanNew = () => {
    router.push("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-4 pt-6">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <Pressable
            onPress={handleBack}
            className="w-10 h-10 items-center justify-center -ml-2"
          >
            <Text className="text-on-surface-variant text-2xl">←</Text>
          </Pressable>
          <Text
            className="text-text-cream text-2xl ml-2"
            style={{ fontFamily: "Inter-SemiBold" }}
          >
            Scan History
          </Text>
        </View>

        {/* Search Bar */}
        <View className="mb-6">
          <SearchBar
            value={localSearch}
            onChangeText={setLocalSearch}
            placeholder="Search recipes..."
          />
        </View>

        {/* Recipe List */}
        {recipes.length > 0 ? (
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 24 }}
            renderItem={({ item }) => (
              <View className="flex-row items-center mb-4">
                <Pressable
                  onPress={() => handleRecipePress(item.id)}
                  className="flex-1 flex-row items-center p-3 rounded-2xl"
                  style={{
                    backgroundColor: Colors.surface,
                    borderWidth: 1,
                    borderColor: Colors.whiteAlpha5,
                  }}
                >
                  {/* Thumbnail */}
                  <View className="w-16 h-16 rounded-xl overflow-hidden mr-4">
                    {item.imageUri ? (
                      <Image
                        source={{ uri: item.imageUri }}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    ) : (
                      <View className="w-full h-full bg-card-surface items-center justify-center border border-white/5">
                        <Text className="text-xl">🍲</Text>
                      </View>
                    )}
                  </View>

                  {/* Details */}
                  <View className="flex-1 justify-center">
                    <Text
                      className="text-text-cream font-inter-semibold text-lg mb-1"
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>
                    <View className="flex-row items-center">
                      <Text className="text-on-surface-variant font-inter-regular text-sm mr-3">
                        {item.estimatedTime}
                      </Text>
                      {item.cuisine && (
                        <View className="bg-surface-high px-2 py-0.5 rounded-md border border-white/5">
                          <Text className="text-on-surface-variant font-inter-medium text-xs">
                            {item.cuisine}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <Text className="text-on-surface-variant text-xl opacity-50 px-2">
                    ›
                  </Text>
                </Pressable>

                {/* Delete Button */}
                <Pressable
                  onPress={() => handleDelete(item.id)}
                  className="w-12 h-[88px] ml-3 rounded-2xl items-center justify-center border border-error-container"
                  style={{ backgroundColor: "rgba(147, 0, 10, 0.2)" }}
                >
                  <Text className="text-error text-xl">🗑️</Text>
                </Pressable>
              </View>
            )}
          />
        ) : (
          /* Empty State */
          <View className="flex-1 items-center justify-center px-4">
            <View
              className="w-24 h-24 rounded-full items-center justify-center mb-6"
              style={{ backgroundColor: Colors.surface }}
            >
              <Text className="text-4xl">📸</Text>
            </View>
            <Text className="text-text-cream font-inter-semibold text-xl mb-2 text-center">
              {searchQuery ? "No matches found" : "No scans yet"}
            </Text>
            <Text className="text-on-surface-variant font-inter-regular text-center mb-8">
              {searchQuery
                ? "Try a different search term"
                : "Your recipe collection is empty. Start scanning to build your personal cookbook!"}
            </Text>
            {!searchQuery && (
              <View className="w-full">
                <Button title="Scan a Recipe" onPress={handleScanNew} />
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
