/**
 * GradientBar - Display gradient spectrum bars
 * Shows action spectrum or orb spectrum from brand kit
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, borderRadius } from '../theme';

interface GradientBarProps {
  type: 'action' | 'orb';
  label?: string;
  height?: number;
}

export default function GradientBar({ type, label, height = 32 }: GradientBarProps) {
  const gradientColors =
    type === 'action'
      ? [
          colors.action.planning,   // #c084fc
          colors.action.research,   // #60a5fa
          colors.action.coding,     // #a78bfa
          colors.action.action,     // #fbbf24
          colors.action.alert,      // #f87171
        ]
      : [
          colors.orb.pulse,  // #ec4899
          colors.orb.void,   // #a855f7
          colors.orb.core,   // #3b82f6
          colors.orb.data,   // #06b6d4
          colors.orb.energy, // #eab308
        ];

  const labelText = type === 'action' ? 'Action Spectrum' : 'Orb Gradient Locus';

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, { height }]}
      />
      {label !== false && (
        <Text style={styles.label}>{label || labelText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  gradient: {
    borderRadius: borderRadius.md,
  },
  label: {
    ...typography.monoSmall,
    color: colors.muted,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
