/**
 * PulseIcon - Status indicator in top-right corner
 * Matches PWA brand kit pulse states: idle, processing, active
 */

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Activity } from 'lucide-react-native';
import { colors, spacing } from '../theme';

interface PulseIconProps {
  variant?: 'idle' | 'processing' | 'active';
  size?: number;
}

export default function PulseIcon({ variant = 'idle', size = 24 }: PulseIconProps) {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Reset animations
    opacity.value = 1;
    scale.value = 1;
    rotation.value = 0;

    if (variant === 'processing') {
      // Processing: Pulsing blue
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.4, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
    } else if (variant === 'active') {
      // Active: Subtle pulse
      scale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
    }
  }, [variant]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  // Determine color based on variant
  let iconColor = colors.text.disabled; // idle: muted gray
  let glowColor = 'transparent';

  if (variant === 'processing') {
    iconColor = colors.orb.core; // Brand kit: blue for processing
    glowColor = colors.orb.core + '40'; // 25% opacity glow
  } else if (variant === 'active') {
    iconColor = colors.orb.pulse; // Brand kit: pink for active
    glowColor = colors.orb.pulse + '40'; // 25% opacity glow
  }

  return (
    <View style={styles.container}>
      {/* Glow ring for active states */}
      {variant !== 'idle' && (
        <Animated.View
          style={[
            styles.glowRing,
            {
              backgroundColor: glowColor,
              width: size + 16,
              height: size + 16,
              borderRadius: (size + 16) / 2,
            },
            animatedStyle,
          ]}
        />
      )}

      {/* Icon */}
      <Animated.View style={[styles.icon, animatedStyle]}>
        <Activity size={size} color={iconColor} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  glowRing: {
    position: 'absolute',
  },
  icon: {
    zIndex: 1,
  },
});
