import React, { useState } from 'react';
import { View, TextInput, Text, Pressable } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search recipes...',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={`bg-[#0f0e0a] rounded-xl px-4 py-3 flex-row items-center border ${
        isFocused ? 'border-brand-orange' : 'border-[#1A2218]'
      }`}
    >
      <Text className="text-base mr-2.5">🔍</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A78B80"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="flex-1 text-[#F5F0E8] font-inter-regular text-base"
        cursorColor="#E8672A"
        selectionColor="rgba(232,103,42,0.3)"
      />

      {value.length > 0 && (
        <Pressable
          onPress={() => onChangeText('')}
          className="ml-2 w-6 h-6 rounded-full bg-[#1A2218] items-center justify-center"
          hitSlop={8}
        >
          <Text className="text-[#A78B80] text-xs font-inter-bold">✕</Text>
        </Pressable>
      )}
    </View>
  );
};

export default SearchBar;
