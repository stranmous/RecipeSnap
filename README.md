# RecipeSnap

RecipeSnap is an AI-powered Android mobile application that extracts structured recipes from photos of printed cookbooks, handwritten notes, or screens. Built with React Native, Expo, and Google Gemini AI.

## Features

- 📸 **Camera & Gallery Support**: Snap a picture or upload an existing image.
- ✨ **AI Recipe Extraction**: Powered by Google Gemini 3.5 Flash for high-accuracy OCR and structured data extraction.
- 💾 **Offline History**: All scanned recipes are permanently saved locally using SQLite.
- 🎨 **Premium UI**: Custom dark culinary theme utilizing NativeWind (Tailwind v4) and glassmorphism.
- 📤 **Share & Copy**: Easily share your scanned recipes as text via the native Android share sheet.

![RecipeSnap thumbnail](assets/thumbnail.png)

## Tech Stack

- **Framework**: React Native (0.86) + Expo SDK 57
- **Routing**: Expo Router
- **Styling**: NativeWind v4 (Tailwind CSS)
- **State Management**: Zustand
- **Local Database**: Expo SQLite
- **AI Integration**: Google Gemini Vision REST API

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Android Studio / Android SDK (for building the APK)

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Start the Expo development server:
```bash
npm run start
```

### Configuration

You can configure your Google Gemini API Key directly inside the app:
1. Open the app.
2. Tap the Settings (⚙️) icon on the Home Screen.
3. Enter your API key. 

Alternatively, to set a default API key for all new builds, edit the `DEFAULT_API_KEY` constant in `src/store/useSettingsStore.ts`.

### Building the Android APK

To generate a standalone APK for Android devices:

```bash
npx expo prebuild --platform android --clean
cd android
./gradlew assembleRelease
```

The compiled APK will be located at:
`android/app/build/outputs/apk/release/app-release.apk`

## Project Structure

```
src/
├── app/                  # Expo Router screens (Home, Scanner, Settings, Result)
├── components/           # UI components and Recipe specific widgets
├── constants/            # Design tokens (Colors, Typography)
├── database/             # SQLite schema and queries
├── services/             # API clients and Image processing
├── store/                # Zustand global state
└── types/                # TypeScript interfaces
```

## License

This project is licensed under the MIT License.
