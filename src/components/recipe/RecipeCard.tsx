import React from 'react';
import { Pressable, View, Text, Image } from 'react-native';

interface RecipeCardProps {
  id: string;
  title: string;
  estimatedTime: string;
  imageUri?: string;
  onPress: (id: string) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  title,
  estimatedTime,
  imageUri,
  onPress,
}) => {
  return (
    <Pressable
      onPress={() => onPress(id)}
      className="w-64 h-80 rounded-2xl overflow-hidden border"
      style={{ borderColor: 'rgba(255,255,255,0.05)' }}
    >
      {/* Background image or placeholder */}
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          className="absolute w-full h-full"
          resizeMode="cover"
        />
      ) : (
        <View className="absolute w-full h-full bg-[#1A2218] items-center justify-center">
          <Text className="text-5xl">📷</Text>
          <Text className="text-on-surface-variant font-inter-medium text-sm mt-2">
            No photo
          </Text>
        </View>
      )}

      {/* Gradient overlay — 3 stacked layers for a smooth dark-to-transparent fade */}
      <View
        className="absolute bottom-0 left-0 right-0 h-1/3"
        style={{ backgroundColor: 'rgba(20,19,15,0.85)' }}
      />
      <View
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{ backgroundColor: 'rgba(20,19,15,0.5)' }}
      />
      <View
        className="absolute bottom-0 left-0 right-0 h-2/3"
        style={{ backgroundColor: 'rgba(20,19,15,0.2)' }}
      />

      {/* Bottom content */}
      <View className="absolute bottom-0 left-0 right-0 p-4">
        {/* Time badge */}
        <View
          className="flex-row items-center self-start rounded-full px-2.5 py-1 mb-2"
          style={{ backgroundColor: 'rgba(26,34,24,0.85)' }}
        >
          <Text className="text-xs mr-1">🕐</Text>
          <Text className="text-xs text-[#e7e2da] font-inter-medium">
            {estimatedTime}
          </Text>
        </View>

        {/* Title */}
        <Text
          className="text-2xl font-inter-semibold text-[#e7e2da]"
          numberOfLines={2}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

export default RecipeCard;
