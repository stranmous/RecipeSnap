import React from 'react';
import { View, Text } from 'react-native';

interface ChipProps {
  label: string;
  icon?: React.ReactNode;
  emoji?: string;
}

export const Chip: React.FC<ChipProps> = ({ label, icon, emoji }) => {
  return (
    <View
      className="bg-[#1A2218] rounded-lg px-3 py-1.5 flex-row items-center gap-1.5 border self-start"
      style={{ borderColor: 'rgba(255,255,255,0.05)' }}
    >
      {icon && <View>{icon}</View>}
      {emoji && <Text className="text-xs">{emoji}</Text>}
      <Text
        className="text-xs font-inter-semibold uppercase tracking-wider"
        style={{ color: 'rgba(245,240,232,0.7)' }}
      >
        {label}
      </Text>
    </View>
  );
};

export default Chip;
