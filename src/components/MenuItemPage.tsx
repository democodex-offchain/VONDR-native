/**
 * MenuItemPage - Full-screen page for menu items
 * Slides in from right, with back button navigation
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

interface MenuItemPageProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function MenuItemPage({ isOpen, title, onClose, children }: MenuItemPageProps) {
  const insets = useSafeAreaInsets();

  // Animated styles
  const pageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(
          isOpen ? 0 : 1000,
          {
            duration: 300,
            easing: isOpen ? Easing.out(Easing.exp) : Easing.in(Easing.exp),
          }
        ),
      },
    ],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isOpen ? 1 : 0, { duration: 300 }),
    pointerEvents: isOpen ? 'auto' : 'none',
  }));

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

      {/* Page */}
      <Animated.View style={[styles.page, pageStyle]}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {children || (
            <View style={styles.placeholderContent}>
              <Text style={styles.placeholderText}>
                Content for {title} will go here
              </Text>
            </View>
          )}
        </ScrollView>
      </Animated.View>
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
    zIndex: 70,
  },
  page: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colors.background,
    zIndex: 71,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.sm,
    marginLeft: -spacing.sm,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40, // Balance the back button
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
  },
  placeholderContent: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    ...typography.body,
    color: colors.text.muted,
    textAlign: 'center',
  },
});
