/**
 * AgentSelectorDrawer - Pulldown drawer from top for agent selection
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
import { colors, typography, spacing, borderRadius } from '../theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAWER_HEIGHT = SCREEN_HEIGHT * 0.6;

interface AgentSelectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAgent?: string;
  onSelectAgent?: (agent: string) => void;
}

const AGENTS = ['Option 1', 'Option 2', 'Option 3'];

export default function AgentSelectorDrawer({ isOpen, onClose, selectedAgent, onSelectAgent }: AgentSelectorDrawerProps) {
  const translateY = useSharedValue(-DRAWER_HEIGHT);

  // Animate drawer open/close
  useEffect(() => {
    translateY.value = withTiming(
      isOpen ? 0 : -DRAWER_HEIGHT,
      {
        duration: 300,
        easing: isOpen ? Easing.out(Easing.exp) : Easing.in(Easing.exp),
      }
    );
  }, [isOpen]);

  // Drawer animated style
  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Backdrop animated style
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: isOpen ? withTiming(1, { duration: 300 }) : withTiming(0, { duration: 250 }),
    pointerEvents: isOpen ? 'auto' : 'none',
  }));

  // Swipe up to close
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY < 0) {
        translateY.value = Math.max(-DRAWER_HEIGHT, event.translationY);
      }
    })
    .onEnd((event) => {
      if (event.translationY < -DRAWER_HEIGHT / 3 || event.velocityY < -500) {
        // Close drawer
        translateY.value = withTiming(-DRAWER_HEIGHT, { duration: 250 }, (finished) => {
          if (finished) {
            runOnJS(onClose)();
          }
        });
      } else {
        // Snap back
        translateY.value = withTiming(0, { duration: 250 });
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
        <Animated.View style={[styles.drawer, drawerStyle, { height: DRAWER_HEIGHT }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.handle} />
            <Text style={styles.headerTitle}>Select Agent</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>

          {/* Agent Grid */}
          <View style={styles.content}>
            <View style={styles.agentGrid}>
              {AGENTS.map((agent) => (
                <TouchableOpacity
                  key={agent}
                  style={[
                    styles.agentCard,
                    selectedAgent === agent && styles.agentCardSelected,
                  ]}
                  onPress={() => {
                    onSelectAgent?.(agent);
                    onClose();
                  }}
                >
                  <Text
                    style={[
                      styles.agentText,
                      selectedAgent === agent && styles.agentTextSelected,
                    ]}
                  >
                    {agent}
                  </Text>
                </TouchableOpacity>
              ))}
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
    zIndex: 60,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.border,
    zIndex: 61,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.surfaceLight,
    borderRadius: 2,
    marginBottom: spacing.md,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.text.primary,
  },
  closeButton: {
    position: 'absolute',
    right: spacing.lg,
    top: spacing.md,
    padding: spacing.sm,
  },
  content: {
    flex: 1,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  agentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  agentCard: {
    width: '47%',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  agentCardSelected: {
    borderColor: colors.accent.purple,
    backgroundColor: colors.accent.purpleLight,
  },
  agentText: {
    ...typography.body,
    color: colors.text.secondary,
  },
  agentTextSelected: {
    color: colors.accent.purple,
    fontWeight: '600',
  },
});
