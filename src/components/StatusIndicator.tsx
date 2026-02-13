/**
 * StatusIndicator - Display orb state with semantic color and label
 * Uses brand kit orb spectrum for mood/state
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, spacing } from '../theme';

export type OrbState =
  | 'pulse'
  | 'synth'
  | 'void'
  | 'deep'
  | 'core'
  | 'aether'
  | 'data'
  | 'stream'
  | 'life'
  | 'energy';

interface StatusIndicatorProps {
  state: OrbState;
  label?: string;
  showDot?: boolean;
  style?: ViewStyle;
}

export default function StatusIndicator({
  state,
  label,
  showDot = true,
  style,
}: StatusIndicatorProps) {
  const stateColor = colors.orb[state];
  const stateLabel = label || state.charAt(0).toUpperCase() + state.slice(1);

  return (
    <View style={[styles.container, style]}>
      {showDot && (
        <View
          style={[
            styles.dot,
            {
              backgroundColor: stateColor,
              shadowColor: stateColor,
            },
          ]}
        />
      )}
      <Text style={[styles.text, { color: stateColor }]}>{stateLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    ...typography.label,
    fontSize: 10,
  },
});
