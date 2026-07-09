/**
 * Root Layout — RecipeSnap
 * Loads fonts, initializes database, sets up Stack navigation
 */

import "@/global.css";

import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import { Colors } from "@/constants/colors";
import { initDatabase } from "@/database/db";
import { useSettingsStore } from "@/store/useSettingsStore";

import { ErrorBoundary } from "@/components/ErrorBoundary";

// Keep splash screen visible until everything is ready
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Regular": Inter_400Regular,
    "Inter-Medium": Inter_500Medium,
    "Inter-SemiBold": Inter_600SemiBold,
    "Inter-Bold": Inter_700Bold,
  });

  const loadSettings = useSettingsStore((s) => s.loadSettings);

  useEffect(() => {
    async function initialize() {
      try {
        // Initialize database schema
        await initDatabase();
        // Load settings from AsyncStorage
        await loadSettings();
      } catch (error) {
        console.error("Initialization error:", error);
      }
    }
    initialize();
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ErrorBoundary>
      <StatusBar style="light" backgroundColor={Colors.background} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: "slide_from_right",
        }}
      />
    </ErrorBoundary>
  );
}
