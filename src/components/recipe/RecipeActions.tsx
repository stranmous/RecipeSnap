import React, { useState } from 'react';
import { View, Text, Pressable, Alert, ToastAndroid, Platform, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Feather } from '@expo/vector-icons';
import { Recipe } from '@/types/recipe';

interface RecipeActionsProps {
  recipe: Recipe;
}

export const RecipeActions: React.FC<RecipeActionsProps> = ({ recipe }) => {
  const [copied, setCopied] = useState(false);

  const formatRecipeForShare = () => {
    const ingredients = recipe.ingredients.map(i => `• ${i}`).join('\n');
    const steps = recipe.steps.map((s, i) => `${i + 1}. ${s}`).join('\n');
    
    return `${recipe.title}

⏱️ ${recipe.estimatedTime}
🍽️ ${recipe.cuisine || 'Various'}

Ingredients:
${ingredients}

Instructions:
${steps}`;
  };

  const handleCopy = async () => {
    const text = formatRecipeForShare();
    await Clipboard.setStringAsync(text);
    setCopied(true);
    
    if (Platform.OS === 'android') {
      ToastAndroid.show('Copied!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Copied!', 'Recipe copied to clipboard');
    }

    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const text = formatRecipeForShare();
    try {
      await Share.share({
        message: text,
        title: recipe.title,
      });
    } catch (error) {
      console.error('Error sharing recipe:', error);
    }
  };

  return (
    <View className="flex-row justify-between bg-[#14130f] border-t border-white/5 py-4 px-6 items-center">
      <Pressable onPress={handleCopy} className="items-center justify-center flex-1" hitSlop={10}>
        <Feather name={copied ? "check" : "copy"} size={20} color="#F5F0E8" />
        <Text className="text-text-cream font-inter-medium text-xs mt-1">{copied ? 'Copied' : 'Copy'}</Text>
      </Pressable>

      <Pressable onPress={handleShare} className="items-center justify-center flex-1" hitSlop={10}>
        <Feather name="share-2" size={20} color="#F5F0E8" />
        <Text className="text-text-cream font-inter-medium text-xs mt-1">Share</Text>
      </Pressable>

      <View className="items-center justify-center flex-1">
        <Feather name="check-circle" size={20} color="#2A9D8F" />
        <Text className="text-brand-teal font-inter-medium text-xs mt-1">Saved</Text>
      </View>
    </View>
  );
};

export default RecipeActions;
