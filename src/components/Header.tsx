/**
 * Header - Top section with VONDR title and agent name
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '../theme';

interface HeaderProps {
  selectedAgent?: string;
}

export default function Header({ selectedAgent }: HeaderProps) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
      {/* Main title */}
      <Text style={styles.title}>VONDR</Text>

      {/* Agent subtitle */}
      {selectedAgent && (
        <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)}>
          <Text style={styles.subtitle}>{selectedAgent}</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 1,
    pointerEvents: 'none',
  },
  title: {
    ...typography.title,
    color: colors.text.primary,
  },
  subtitle: {
    ...typography.subtitle,
    color: colors.text.muted,
    marginTop: spacing.xs,
  },
});
