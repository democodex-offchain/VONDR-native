/**
 * VONDR Button Styles
 * Matching the PWA Brand Kit exactly
 * See: BrandKitContent.tsx button examples
 */

import { ViewStyle, TextStyle } from 'react-native';
import { colors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius } from './spacing';

export const buttonStyles = {
  // Primary CTA Button
  primary: {
    container: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.full,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.6)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    } as ViewStyle,
    text: {
      ...typography.label,
      color: colors.foreground,
    } as TextStyle,
    pressed: {
      borderColor: 'rgba(255, 255, 255, 1)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      transform: [{ scale: 1.05 }],
    } as ViewStyle,
  },

  // Secondary Button
  secondary: {
    container: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.full,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    } as ViewStyle,
    text: {
      ...typography.label,
      color: colors.muted,
    } as TextStyle,
    pressed: {
      borderColor: 'rgba(255, 255, 255, 0.4)',
      color: colors.foreground,
    } as ViewStyle,
  },

  // Success Button
  success: {
    container: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.full,
      borderWidth: 1,
      borderColor: 'rgba(52, 211, 153, 0.5)', // action.system
      backgroundColor: 'rgba(52, 211, 153, 0.1)',
    } as ViewStyle,
    text: {
      ...typography.label,
      color: '#a7f3d0', // emerald-200
    } as TextStyle,
    pressed: {
      borderColor: 'rgba(52, 211, 153, 0.7)',
      backgroundColor: 'rgba(52, 211, 153, 0.2)',
    } as ViewStyle,
  },

  // Danger Button
  danger: {
    container: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.full,
      borderWidth: 1,
      borderColor: 'rgba(248, 113, 113, 0.5)', // action.alert
      backgroundColor: 'rgba(248, 113, 113, 0.1)',
    } as ViewStyle,
    text: {
      ...typography.label,
      color: '#fca5a5', // red-200
    } as TextStyle,
    pressed: {
      borderColor: 'rgba(248, 113, 113, 0.7)',
      backgroundColor: 'rgba(248, 113, 113, 0.2)',
    } as ViewStyle,
  },

  // Info Button
  info: {
    container: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.full,
      borderWidth: 1,
      borderColor: 'rgba(96, 165, 250, 0.5)', // action.research
      backgroundColor: 'rgba(96, 165, 250, 0.1)',
    } as ViewStyle,
    text: {
      ...typography.label,
      color: '#93c5fd', // blue-200
    } as TextStyle,
    pressed: {
      borderColor: 'rgba(96, 165, 250, 0.7)',
      backgroundColor: 'rgba(96, 165, 250, 0.2)',
    } as ViewStyle,
  },

  // Send Button (contextual action)
  send: {
    container: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.foreground,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: 'rgba(255, 255, 255, 0.1)',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 10,
    } as ViewStyle,
    iconColor: colors.background, // Black icon on white button
    pressed: {
      backgroundColor: colors.action.research, // Blue on press
      transform: [{ scale: 1.05 }],
    } as ViewStyle,
    pressedIconColor: colors.foreground, // White icon when pressed
    disabled: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      shadowOpacity: 0,
    } as ViewStyle,
    disabledIconColor: colors.text.disabled,
  },

  // Toggle Button (for features like activity toggle)
  toggle: {
    container: {
      width: 48,
      height: 48,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.05)',
      backgroundColor: 'rgba(24, 24, 27, 0.5)', // surface with opacity
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    iconColor: colors.muted,
    pressed: {
      borderColor: 'rgba(255, 255, 255, 0.1)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    } as ViewStyle,
    pressedIconColor: colors.foreground,
    active: {
      borderColor: colors.orb.pulse,
      backgroundColor: colors.orb.pulse + '20', // 12% opacity
    } as ViewStyle,
    activeIconColor: colors.orb.pulse,
  },
} as const;

export type ButtonStyles = typeof buttonStyles;
