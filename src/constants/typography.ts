/**
 * RecipeSnap Typography Presets
 * Based on Stitch Design System — Inter font family
 */

import { TextStyle } from "react-native";

export const Typography = {
  headlineXl: {
    fontFamily: "Inter-Bold",
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -0.8, // -0.02em
  } satisfies TextStyle,

  headlineLg: {
    fontFamily: "Inter-Bold",
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.32, // -0.01em
  } satisfies TextStyle,

  headlineLgMobile: {
    fontFamily: "Inter-Bold",
    fontSize: 28,
    lineHeight: 34,
  } satisfies TextStyle,

  headlineMd: {
    fontFamily: "Inter-SemiBold",
    fontSize: 24,
    lineHeight: 32,
  } satisfies TextStyle,

  bodyLg: {
    fontFamily: "Inter-Regular",
    fontSize: 18,
    lineHeight: 28,
  } satisfies TextStyle,

  bodyMd: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    lineHeight: 24,
  } satisfies TextStyle,

  bodySm: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    lineHeight: 20,
  } satisfies TextStyle,

  labelMd: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6, // 0.05em
    textTransform: "uppercase" as const,
  } satisfies TextStyle,

  button: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    lineHeight: 24,
  } satisfies TextStyle,
} as const;
