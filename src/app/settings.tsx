/**
 * Settings Screen — RecipeSnap
 * View about info
 */

import { View, Text, Pressable, SafeAreaView, Linking } from "react-native";
import { useRouter } from "expo-router";

import { Card } from "@/components/ui/Card";

export default function SettingsScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleOpenGithub = () => {
    Linking.openURL("https://github.com/stranmous/RecipeSnap"); 
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-4 pt-6">
        {/* Header */}
        <View className="flex-row items-center mb-8">
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
            Settings
          </Text>
        </View>

        {/* About Section */}
        <View>
          <Text
            className="text-brand-teal text-sm mb-4"
            style={{
              fontFamily: "Inter-SemiBold",
              letterSpacing: 0.6,
              textTransform: "uppercase",
            }}
          >
            About RecipeSnap
          </Text>

          <Card>
            <View className="flex-row items-center justify-between p-4 border-b border-white/5">
              <Text className="text-text-cream font-inter-medium">Version</Text>
              <Text className="text-on-surface-variant font-inter-regular">
                1.0.0
              </Text>
            </View>
            
            <Pressable
              onPress={handleOpenGithub}
              className="flex-row items-center justify-between p-4 border-b border-white/5"
            >
              <Text className="text-text-cream font-inter-medium">GitHub Repository</Text>
              <Text className="text-on-surface-variant font-inter-regular text-lg">
                ↗
              </Text>
            </Pressable>

            <View className="flex-row items-center justify-between p-4">
              <Text className="text-text-cream font-inter-medium">Powered By</Text>
              <View className="flex-row items-center">
                <Text className="mr-2">✨</Text>
                <Text className="text-on-surface-variant font-inter-regular">
                  Google Gemini
                </Text>
              </View>
            </View>
          </Card>
        </View>
      </View>
    </SafeAreaView>
  );
}
