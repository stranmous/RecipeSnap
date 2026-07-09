import React from 'react';
import { View, Text } from 'react-native';
import { GlassPanel } from '@/components/ui/GlassPanel';

interface IngredientsListProps {
  ingredients: string[];
}

export const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients }) => {
  if (!ingredients || ingredients.length === 0) return null;

  return (
    <GlassPanel className="mb-6">
      <Text className="font-inter-semibold text-xl text-text-cream mb-4">
        Ingredients
      </Text>
      
      <View>
        {ingredients.map((ingredient, index) => (
          <View 
            key={index} 
            className={`flex-row items-start py-3 ${
              index !== ingredients.length - 1 ? 'border-b border-white/5' : ''
            }`}
          >
            <View className="w-2 h-2 rounded-full bg-brand-orange mt-2 mr-3" />
            <Text className="flex-1 text-[#e0c0b4] text-base font-inter-regular leading-relaxed">
              {ingredient}
            </Text>
          </View>
        ))}
      </View>
    </GlassPanel>
  );
};

export default IngredientsList;
