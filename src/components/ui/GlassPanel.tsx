import React from 'react';
import { View } from 'react-native';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
}) => {
  return (
    <View
      className={`rounded-xl p-4 border ${className}`}
      style={{
        backgroundColor: 'rgba(26,34,24,0.8)',
        borderColor: 'rgba(255,255,255,0.05)',
      }}
    >
      {children}
    </View>
  );
};

export default GlassPanel;
