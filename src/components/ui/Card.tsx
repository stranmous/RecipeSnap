import React from 'react';
import { Pressable, View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  className = '',
}) => {
  const baseClassName = `bg-[#1A2218] rounded-2xl border ${className}`;

  const borderStyle = { borderColor: 'rgba(255,255,255,0.05)' };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        className={baseClassName}
        style={borderStyle}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View className={baseClassName} style={borderStyle}>
      {children}
    </View>
  );
};

export default Card;
