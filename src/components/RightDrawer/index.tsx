/**
 * RightDrawer - Agent stream panel (slides from right)
 * Phase 1: Shell with styling only, no functionality
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { X } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.9;
const DRAWER_MAX_WIDTH = 400;
const FINAL_DRAWER_WIDTH = Math.min(DRAWER_WIDTH, DRAWER_MAX_WIDTH);

interface RightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RightDrawer({ isOpen, onClose }: RightDrawerProps) {
  const translateX = useSharedValue(FINAL_DRAWER_WIDTH);

  // Animate drawer open/close
  useEffect(() => {
    translateX.value = withTiming(
      isOpen ? 0 : FINAL_DRAWER_WIDTH,
      {
        duration: 300,
        easing: isOpen ? Easing.out(Easing.exp) : Easing.in(Easing.exp),
      }
    );
  }, [isOpen]);

  // Drawer animated style
  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Backdrop animated style
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: isOpen ? withTiming(1, { duration: 300 }) : withTiming(0, { duration: 250 }),
    pointerEvents: isOpen ? 'auto' : 'none',
  }));

  // Swipe right to close
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX > 0) {
        translateX.value = Math.min(FINAL_DRAWER_WIDTH, event.translationX);
      }
    })
    .onEnd((event) => {
      if (event.translationX > FINAL_DRAWER_WIDTH / 3 || event.velocityX > 500) {
        // Close drawer
        translateX.value = withTiming(FINAL_DRAWER_WIDTH, { duration: 250 }, (finished) => {
          if (finished) {
            runOnJS(onClose)();
          }
        });
      } else {
        // Snap back
        translateX.value = withTiming(0, { duration: 250 });
      }
    });

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
        />
      </Animated.View>

      {/* Drawer */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.drawer, drawerStyle, { width: FINAL_DRAWER_WIDTH }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Agent Stream</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>

          {/* Content Area (placeholder) */}
          <View style={styles.content}>
            <View style={styles.messagePlaceholder}>
              <Text style={styles.placeholderText}>User message will appear here</Text>
            </View>
            <View style={styles.messagePlaceholder}>
              <Text style={styles.placeholderText}>Agent response will appear here</Text>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 50,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    zIndex: 51,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.h3, // Brand kit: uppercase, wide tracking
    color: colors.text.primary,
  },
  closeButton: {
    padding: spacing.sm,
  },
  content: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  messagePlaceholder: {
    padding: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  placeholderText: {
    ...typography.body,
    color: colors.muted, // Brand kit: muted text
  },
});
