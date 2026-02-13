/**
 * MainCanvas - Central container for VONDR interface
 * Features gradient background, header, and tap detection zones
 */

import React, { useCallback, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { colors } from '../theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const TAP_ZONE_HEIGHT = SCREEN_HEIGHT * 0.2; // Bottom 20% for tap detection

interface MainCanvasProps {
  children: React.ReactNode;
  onSingleTap?: () => void;
  onDoubleTap?: () => void;
}

export default function MainCanvas({ children, onSingleTap, onDoubleTap }: MainCanvasProps) {
  const [tapCount, setTapCount] = useState(0);
  const tapTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle tap gesture
  const handleTap = useCallback((event: any) => {
    const { locationY } = event.nativeEvent;
    
    // Only trigger if tap is in bottom 20% zone
    const isInBottomZone = locationY > (SCREEN_HEIGHT - TAP_ZONE_HEIGHT);
    if (!isInBottomZone) return;

    // Clear existing timer
    if (tapTimerRef.current) {
      clearTimeout(tapTimerRef.current);
    }

    const newCount = tapCount + 1;
    setTapCount(newCount);

    // Wait 300ms to distinguish single vs double tap
    tapTimerRef.current = setTimeout(() => {
      if (newCount === 1) {
        onSingleTap?.();
      } else if (newCount >= 2) {
        onDoubleTap?.();
      }
      setTapCount(0);
    }, 300);
  }, [tapCount, onSingleTap, onDoubleTap]);

  return (
    <View style={styles.container}>
      {/* Radial gradient background - Brand Kit spec */}
      <LinearGradient
        colors={[colors.gradient.backgroundFrom, colors.gradient.backgroundVia, colors.gradient.backgroundTo]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <TouchableWithoutFeedback onPress={handleTap}>
        <View style={styles.content}>
          {children}

          {/* Debug tap zone indicator (optional) */}
          {__DEV__ && (
            <View
              style={[
                styles.tapZone,
                {
                  bottom: 0,
                  height: TAP_ZONE_HEIGHT,
                },
              ]}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  tapZone: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 0, 0, 0.2)', // Debug indicator
    pointerEvents: 'none',
  },
});
