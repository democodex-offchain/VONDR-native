/**
 * LeftMenuDrawer - Slide-in menu from left side
 * Phase 1: Shell with styling only, no functionality
 */

import React, { useCallback, useEffect, useRef } from 'react';
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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.8;
const DRAWER_MAX_WIDTH = 320;
const FINAL_DRAWER_WIDTH = Math.min(DRAWER_WIDTH, DRAWER_MAX_WIDTH);

interface LeftMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuItemPress?: (item: string) => void;
}

const MENU_ITEMS = ['Agents', 'Sessions', 'Settings', 'Integrations', 'Demo'];

export default function LeftMenuDrawer({ isOpen, onClose, onMenuItemPress }: LeftMenuDrawerProps) {
  const translateX = useSharedValue(-FINAL_DRAWER_WIDTH);

  // Animate drawer open/close
  useEffect(() => {
    translateX.value = withTiming(
      isOpen ? 0 : -FINAL_DRAWER_WIDTH,
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

  // Swipe left to close
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX < 0) {
        translateX.value = Math.max(-FINAL_DRAWER_WIDTH, event.translationX);
      }
    })
    .onEnd((event) => {
      if (event.translationX < -FINAL_DRAWER_WIDTH / 3 || event.velocityX < -500) {
        // Close drawer
        translateX.value = withTiming(-FINAL_DRAWER_WIDTH, { duration: 250 }, (finished) => {
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
            <Text style={styles.headerTitle}>Menu</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>

          {/* Content Area */}
          <View style={styles.content}>
            {MENU_ITEMS.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.menuItem}
                onPress={() => {
                  onMenuItemPress?.(item);
                }}
              >
                <Text style={styles.menuItemText}>{item}</Text>
              </TouchableOpacity>
            ))}
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
    left: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    zIndex: 51,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
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
    ...typography.h2,
    color: colors.text.primary,
  },
  closeButton: {
    padding: spacing.sm,
  },
  content: {
    flex: 1,
    paddingVertical: spacing.md,
  },
  menuItem: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  menuItemText: {
    ...typography.body,
    color: colors.text.secondary,
  },
});
