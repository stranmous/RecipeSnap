import { processImageToBase64, processImage } from "@/services/imageProcessor";
import { manipulateAsync } from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";

// Mock the modules
jest.mock("expo-image-manipulator", () => ({
  manipulateAsync: jest.fn(),
  SaveFormat: { JPEG: "jpeg" },
}));

jest.mock("expo-file-system", () => ({
  readAsStringAsync: jest.fn(),
  EncodingType: { Base64: "base64" },
}));

describe("Image Processor Service", () => {
  const mockUri = "file:///path/to/test/image.jpg";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("compresses and resizes image properly", async () => {
    const mockManipulatedUri = "file:///path/to/manipulated.jpg";
    (manipulateAsync as jest.Mock).mockResolvedValueOnce({
      uri: mockManipulatedUri,
      width: 1024,
      height: 768,
    });

    const result = await processImage(mockUri);

    expect(manipulateAsync).toHaveBeenCalledWith(
      mockUri,
      [{ resize: { width: 1024 } }],
      { compress: 0.75, format: "jpeg" }
    );
    expect(result).toBe(mockManipulatedUri);
  });

  it("converts image to base64", async () => {
    const mockManipulatedUri = "file:///path/to/manipulated.jpg";
    const mockBase64 = "base64encodedstring";

    (manipulateAsync as jest.Mock).mockResolvedValueOnce({
      uri: mockManipulatedUri,
    });
    
    (FileSystem.readAsStringAsync as jest.Mock).mockResolvedValueOnce(mockBase64);

    const result = await processImageToBase64(mockUri);

    expect(FileSystem.readAsStringAsync).toHaveBeenCalledWith(
      mockManipulatedUri,
      { encoding: "base64" }
    );
    expect(result).toBe(mockBase64);
  });
});
