<div align="center">
 
  <img src="https://github.com/stranmous/RecipeSnap/blob/main/assets/images/icon.png" alt="RecipeSnap Banner" width="200">

  # RecipeSnap

  **An AI-powered Android mobile application that extracts structured recipes from photos.**

  [![Android Platform](https://img.shields.io/badge/Platform-Android_12+-3DDC84?logo=android&logoColor=white)](#)
  [![React Native](https://img.shields.io/badge/React_Native-0.86-61DAFB?logo=react&logoColor=white)](#)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg)](#)

</div>

---

RecipeSnap helps you easily digitize and save your favorite recipes locally. Instead of manually typing out ingredients and steps, the app uses Google Gemini Vision AI to instantly read and categorize recipes from photos of cookbooks, handwritten notes, or screens. Your recipes are permanently saved locally on your device in an SQLite database.

---

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

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Android Studio / Android SDK (for building the APK)

## Installation

You can install the app using the APK provided in the repository.

1. Download the latest `RecipeSnap.apk` from the [Releases](https://github.com/stranmous/RecipeSnap/releases/tag/v1.0.0) page.
2. Open the APK on your Android device.
3. If prompted, allow your file manager to "Install unknown apps."
4. Complete the installation and open the app.

---

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
