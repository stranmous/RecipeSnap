/**
 * Image Processor Service
 * Resizes and compresses images, converts to base64 for Gemini API
 */

import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import * as FileSystem from "expo-file-system/legacy";

const MAX_DIMENSION = 2048;
const JPEG_QUALITY = 0.9;

/**
 * Process an image for AI analysis:
 * 1. Resize to max 1024x1024 (preserve aspect ratio)
 * 2. Compress to JPEG quality 75%
 * 3. Return base64 encoded string
 */
export async function processImageToBase64(uri: string): Promise<string> {
  // Resize the image
  const manipulated = await manipulateAsync(
    uri,
    [{ resize: { width: MAX_DIMENSION } }],
    {
      compress: JPEG_QUALITY,
      format: SaveFormat.JPEG,
    }
  );

  // Read as base64
  const base64 = await FileSystem.readAsStringAsync(manipulated.uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return base64;
}

/**
 * Get the processed image URI (resized + compressed) without base64
 * Useful for saving the optimized image locally
 */
export async function processImage(uri: string): Promise<string> {
  const manipulated = await manipulateAsync(
    uri,
    [{ resize: { width: MAX_DIMENSION } }],
    {
      compress: JPEG_QUALITY,
      format: SaveFormat.JPEG,
    }
  );

  return manipulated.uri;
}
