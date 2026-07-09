import React from 'react';
import { View, Text } from 'react-native';

interface StepsListProps {
  steps: string[];
}

export const StepsList: React.FC<StepsListProps> = ({ steps }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <View className="mb-6 px-1">
      <Text className="font-inter-semibold text-xl text-text-cream mb-4">
        Instructions
      </Text>
      
      <View>
        {steps.map((step, index) => (
          <View key={index} className="flex-row mb-6">
            <View className="w-8 h-8 rounded-full bg-brand-teal items-center justify-center mr-4 mt-0.5">
              <Text className="text-text-cream font-inter-bold text-sm">
                {index + 1}
              </Text>
            </View>
            <Text className="flex-1 text-[#e0c0b4] text-base font-inter-regular leading-relaxed">
              {step}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default StepsList;
