/**
 * CentralOrb - Main interaction element with tap and drag gestures
 * Features:
 * - Tap: Toggle active/inactive state
 * - Drag left: Cancel (red glow)
 * - Drag right: Send (green glow)
 * - Drag down: Open agents drawer
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing } from '../theme';

const ORB_SIZE = 120;
const DRAG_THRESHOLD = 80;

interface CentralOrbProps {
  onPullDown?: () => void;
  onPullLeft?: () => void;
  onPullRight?: () => void;
}

export default function CentralOrb({ onPullDown, onPullLeft, onPullRight }: CentralOrbProps) {
  const [isActive, setIsActive] = useState(false);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  
  // Drag gesture
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      
      // Scale based on drag distance
      const distance = Math.sqrt(
        event.translationX ** 2 + event.translationY ** 2
      );
      scale.value = 1 + distance / 400;
    })
    .onEnd((event) => {
      const { translationX, translationY } = event;
      
      // Check drag direction
      if (Math.abs(translationX) > Math.abs(translationY)) {
        // Horizontal drag
        if (translationX < -DRAG_THRESHOLD) {
          // Pull left = Cancel
          if (onPullLeft) {
            runOnJS(onPullLeft)();
          }
        } else if (translationX > DRAG_THRESHOLD) {
          // Pull right = Send
          if (onPullRight) {
            runOnJS(onPullRight)();
          }
        }
      } else {
        // Vertical drag
        if (translationY > DRAG_THRESHOLD) {
          // Pull down = Open agents
          if (onPullDown) {
            runOnJS(onPullDown)();
          }
        }
      }
      
      // Spring back to center
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
    });

  // Tap gesture
  const tapGesture = Gesture.Tap().onEnd(() => {
    runOnJS(setIsActive)(!isActive);
  });

  // Combine gestures
  const composed = Gesture.Exclusive(panGesture, tapGesture);

  // Orb animated style
  const orbStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  // Glow color based on drag direction - Brand Kit orb spectrum
  const glowStyle = useAnimatedStyle(() => {
    let glowColor = colors.orb.void + '33'; // Default: purple with 20% opacity
    
    if (translateX.value < -DRAG_THRESHOLD) {
      glowColor = colors.action.alert + '33'; // Cancel: red
    } else if (translateX.value > DRAG_THRESHOLD) {
      glowColor = colors.orb.life + '33'; // Send: green
    } else if (translateY.value > DRAG_THRESHOLD) {
      glowColor = colors.orb.core + '33'; // Agents: blue
    }
    
    return {
      backgroundColor: glowColor,
      opacity: isActive ? 0.8 : 0.4,
    };
  });

  // Pulse animation
  const pulseStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withRepeat(
          withSequence(
            withTiming(1, { duration: 2000 }),
            withTiming(1.05, { duration: 2000 })
          ),
          -1,
          true
        ),
      },
    ],
  }));

  return (
    <View style={styles.container}>
      {/* Outer glow ring */}
      <Animated.View style={[styles.glowRing, glowStyle, pulseStyle]} />
      
      {/* Gradient border ring (active state) */}
      {isActive && (
        <LinearGradient
          colors={[colors.orb.pulse, colors.orb.void, colors.orb.core, colors.orb.energy]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientRing}
        />
      )}
      
      {/* Draggable orb */}
      <GestureDetector gesture={composed}>
        <Animated.View style={[styles.orb, orbStyle]}>
          <View style={[styles.innerOrb, isActive && styles.innerOrbActive]} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -ORB_SIZE / 2,
    marginTop: -ORB_SIZE / 2,
    width: ORB_SIZE,
    height: ORB_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  glowRing: {
    position: 'absolute',
    width: ORB_SIZE + 40,
    height: ORB_SIZE + 40,
    borderRadius: (ORB_SIZE + 40) / 2,
  },
  gradientRing: {
    position: 'absolute',
    width: ORB_SIZE + 8,
    height: ORB_SIZE + 8,
    borderRadius: (ORB_SIZE + 8) / 2,
  },
  orb: {
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.orb.void, // Brand kit: void purple
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  innerOrb: {
    width: ORB_SIZE - 40,
    height: ORB_SIZE - 40,
    borderRadius: (ORB_SIZE - 40) / 2,
    backgroundColor: colors.orb.void, // Brand kit: void purple
    opacity: 0.2,
  },
  innerOrbActive: {
    backgroundColor: colors.orb.pulse, // Brand kit: pulse pink
    opacity: 0.6,
  },
});
