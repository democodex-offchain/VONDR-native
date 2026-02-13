/**
 * ActionBadge - Display agent action/activity with semantic color
 * Uses brand kit functional palette for meaning
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

export type ActionType =
  | 'planning'
  | 'analyzing'
  | 'research'
  | 'docs'
  | 'coding'
  | 'generating'
  | 'action'
  | 'system'
  | 'alert'
  | 'fileOps';

interface ActionBadgeProps {
  type: ActionType;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export default function ActionBadge({ type, label, size = 'medium', style }: ActionBadgeProps) {
  const badgeColor = colors.action[type];
  const badgeLabel = label || type.charAt(0).toUpperCase() + type.slice(1);

  // Size variants
  const sizeStyles = {
    small: {
      container: { paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
      text: { fontSize: 9, letterSpacing: 1 },
      indicator: { width: 6, height: 6 },
    },
    medium: {
      container: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
      text: { fontSize: 10, letterSpacing: 1.5 },
      indicator: { width: 8, height: 8 },
    },
    large: {
      container: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
      text: { fontSize: 11, letterSpacing: 2 },
      indicator: { width: 10, height: 10 },
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: badgeColor + '20', // 12% opacity
          borderColor: badgeColor + '60',     // 38% opacity
        },
        currentSize.container,
        style,
      ]}
    >
      {/* Color indicator dot */}
      <View
        style={[
          styles.indicator,
          { backgroundColor: badgeColor },
          currentSize.indicator,
        ]}
      />

      {/* Label */}
      <Text
        style={[
          styles.text,
          { color: badgeColor },
          currentSize.text,
        ]}
      >
        {badgeLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.full,
    borderWidth: 1,
    gap: spacing.xs,
  },
  indicator: {
    borderRadius: 999,
  },
  text: {
    ...typography.label,
    fontWeight: '600',
  },
});
