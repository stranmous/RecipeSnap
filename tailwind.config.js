/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Core surfaces
        background: "#14130f",
        surface: "#21201b",
        "surface-dim": "#14130f",
        "surface-bright": "#3b3934",
        "surface-low": "#1d1c17",
        "surface-high": "#2b2a25",
        "surface-highest": "#36352f",

        // Primary (warm orange)
        primary: "#ffb598",
        "primary-container": "#eb692c",
        "on-primary": "#591d00",

        // Secondary (teal)
        secondary: "#6fd8c8",
        "secondary-container": "#30a193",
        "on-secondary": "#003731",

        // On-surface text
        "on-surface": "#e7e2da",
        "on-surface-variant": "#e0c0b4",

        // Borders
        outline: "#a78b80",
        "outline-variant": "#584239",

        // Error
        error: "#ffb4ab",
        "error-container": "#93000a",

        // Brand colors (direct from PRD)
        "brand-orange": "#E8672A",
        "brand-teal": "#2A9D8F",
        "text-cream": "#F5F0E8",
        "card-surface": "#1A2218",
      },
      fontFamily: {
        "inter-regular": ["Inter-Regular"],
        "inter-medium": ["Inter-Medium"],
        "inter-semibold": ["Inter-SemiBold"],
        "inter-bold": ["Inter-Bold"],
      },
      fontSize: {
        "headline-xl": [
          "40px",
          {
            lineHeight: "48px",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        "headline-lg": [
          "32px",
          { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "label-md": [
          "12px",
          { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "600" },
        ],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
      },
    },
  },
  plugins: [],
};
