import React, { useRef } from 'react';
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  Animated,
  type ViewStyle,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

const variantStyles: Record<
  NonNullable<ButtonProps['variant']>,
  { container: string; text: string; indicatorColor: string }
> = {
  primary: {
    container: 'bg-brand-orange rounded-xl py-4 w-full shadow-lg',
    text: 'text-text-cream font-inter-semibold text-base',
    indicatorColor: '#F5F0E8',
  },
  secondary: {
    container:
      'bg-transparent border-[1.5px] border-brand-teal rounded-xl py-4 w-full',
    text: 'text-text-cream font-inter-semibold text-base',
    indicatorColor: '#F5F0E8',
  },
  ghost: {
    container: 'bg-transparent py-4',
    text: 'text-on-surface-variant font-inter-medium text-base',
    indicatorColor: '#e0c0b4',
  },
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const styles = variantStyles[variant];

  const animatedStyle: Animated.WithAnimatedObject<ViewStyle> = {
    transform: [{ scale: scaleAnim }],
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        className={`${styles.container} flex-row items-center justify-center ${
          disabled ? 'opacity-50' : 'opacity-100'
        }`}
      >
        {loading ? (
          <ActivityIndicator size="small" color={styles.indicatorColor} />
        ) : (
          <View className="flex-row items-center justify-center gap-2">
            {icon && <View>{icon}</View>}
            <Text className={styles.text}>{title}</Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
};

export default Button;
