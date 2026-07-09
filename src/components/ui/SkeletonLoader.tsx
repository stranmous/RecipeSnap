import React, { useEffect } from 'react';
import { View, type DimensionValue } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface SkeletonLoaderProps {
  width?: number | DimensionValue;
  height?: number;
  borderRadius?: number;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 8,
  className = '',
}) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      className={`bg-[#2b2a25] ${className}`}
      style={[
        {
          width: width as DimensionValue,
          height,
          borderRadius,
        },
        animatedStyle,
      ]}
    />
  );
};

/**
 * Pre-composed skeleton matching the RecipeCard layout:
 * - Image placeholder (top portion)
 * - Title line
 * - Subtitle / time badge line
 */
export const SkeletonRecipeCard: React.FC = () => {
  return (
    <View
      className="w-64 h-80 rounded-2xl overflow-hidden border"
      style={{
        backgroundColor: '#1A2218',
        borderColor: 'rgba(255,255,255,0.05)',
      }}
    >
      {/* Image placeholder */}
      <SkeletonLoader
        width="100%"
        height={180}
        borderRadius={0}
      />

      {/* Content area */}
      <View className="p-3 gap-2.5">
        {/* Title line */}
        <SkeletonLoader width="85%" height={22} borderRadius={6} />

        {/* Subtitle line */}
        <SkeletonLoader width="50%" height={16} borderRadius={6} />

        {/* Time badge */}
        <SkeletonLoader width={80} height={24} borderRadius={8} />
      </View>
    </View>
  );
};

export default SkeletonLoader;
