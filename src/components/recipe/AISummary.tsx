import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { GlassPanel } from '@/components/ui/GlassPanel';

interface AISummaryProps {
  summary: string;
}

export const AISummary: React.FC<AISummaryProps> = ({ summary }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!summary) return null;

  return (
    <GlassPanel className="mb-6">
      <Pressable 
        className="flex-row items-center justify-between"
        onPress={() => setIsExpanded(!isExpanded)}
        hitSlop={8}
      >
        <Text className="font-inter-semibold text-brand-teal text-base">
          ✨ AI Summary
        </Text>
        <Feather 
          name={isExpanded ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#2A9D8F" 
        />
      </Pressable>

      {isExpanded && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          layout={Layout.springify().damping(15)}
        >
          <Text className="text-[#e0c0b4] text-sm mt-3 font-inter-regular leading-relaxed">
            {summary}
          </Text>
        </Animated.View>
      )}
    </GlassPanel>
  );
};

export default AISummary;
