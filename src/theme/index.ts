/**
 * VONDR Theme System
 * Central export for all theme tokens
 */

export { colors } from './colors';
export { typography } from './typography';
export { spacing, borderRadius } from './spacing';
export { buttonStyles } from './buttons';

// Re-export types
export type { Colors } from './colors';
export type { Typography } from './typography';
export type { Spacing, BorderRadius } from './spacing';

// Combined theme object
import { colors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius } from './spacing';

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
} as const;

export type Theme = typeof theme;
