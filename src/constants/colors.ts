/**
 * RecipeSnap Color Tokens
 * Based on Stitch Design System (Material Design 3 adapted)
 */

export const Colors = {
  // Core surfaces
  background: "#14130f",
  surface: "#21201b",
  surfaceDim: "#14130f",
  surfaceBright: "#3b3934",
  surfaceLow: "#1d1c17",
  surfaceHigh: "#2b2a25",
  surfaceHighest: "#36352f",

  // Primary (warm orange)
  primary: "#ffb598",
  primaryContainer: "#eb692c",
  onPrimary: "#591d00",

  // Secondary (teal)
  secondary: "#6fd8c8",
  secondaryContainer: "#30a193",
  onSecondary: "#003731",

  // On-surface text
  onSurface: "#e7e2da",
  onSurfaceVariant: "#e0c0b4",

  // Borders
  outline: "#a78b80",
  outlineVariant: "#584239",

  // Error
  error: "#ffb4ab",
  errorContainer: "#93000a",

  // Direct brand colors (from PRD)
  brandOrange: "#E8672A",
  brandTeal: "#2A9D8F",
  textCream: "#F5F0E8",
  cardSurface: "#1A2218",

  // Transparent variants
  whiteAlpha5: "rgba(255, 255, 255, 0.05)",
  whiteAlpha10: "rgba(255, 255, 255, 0.10)",
  blackAlpha50: "rgba(0, 0, 0, 0.5)",
  cardSurfaceAlpha80: "rgba(26, 34, 24, 0.8)",
} as const;
