/**
 * VONDR Typography System
 * Matching the PWA Brand Kit exactly
 * See: BrandKitContent.tsx in vondr-pwa
 * 
 * Font Families:
 * - Inter Light: Headings/Display (not available on iOS, using system light)
 * - Helvetica/Arial: Body copy (iOS system default)
 * - JetBrains Mono: Technical/Data (iOS uses Menlo/Courier)
 */

export const typography = {
  // Wordmark/Title (VONDR header) - Jost Light in PWA, use system light
  title: {
    fontSize: 48,           // Large display
    fontWeight: '300' as const,  // Light weight
    letterSpacing: 4,       // Wide tracking
    textTransform: 'uppercase' as const,
  },
  
  // Headings (Inter Light style)
  h1: {
    fontSize: 48,           // text-5xl
    fontWeight: '300' as const,  // Light
    letterSpacing: 3,       // Wider tracking
    textTransform: 'uppercase' as const,
  },
  h2: {
    fontSize: 30,           // text-3xl
    fontWeight: '300' as const,  // Light
    letterSpacing: 2,       // Wider tracking
    textTransform: 'uppercase' as const,
  },
  h3: {
    fontSize: 20,           // text-xl
    fontWeight: '300' as const,  // Light
    letterSpacing: 2,       // Wider tracking
    textTransform: 'uppercase' as const,
  },
  h4: {
    fontSize: 18,           // text-lg
    fontWeight: '300' as const,  // Light
    letterSpacing: 2,       // Wide tracking
    textTransform: 'uppercase' as const,
  },
  
  // Body text (Helvetica/Arial - iOS system default)
  body: {
    fontSize: 14,           // text-sm
    fontWeight: '400' as const,  // Regular
    lineHeight: 21,         // Relaxed (1.5x)
  },
  bodyLarge: {
    fontSize: 16,           // text-base
    fontWeight: '400' as const,
    lineHeight: 24,         // Relaxed
  },
  bodySmall: {
    fontSize: 12,           // text-xs
    fontWeight: '400' as const,
    lineHeight: 18,         // Relaxed
  },
  
  // Monospace/Technical (JetBrains Mono style, using iOS Courier/Menlo)
  mono: {
    fontSize: 12,
    fontWeight: '400' as const,
    fontFamily: 'Courier' as const, // iOS will use Courier or Menlo
    letterSpacing: 0.5,
  },
  monoSmall: {
    fontSize: 10,
    fontWeight: '400' as const,
    fontFamily: 'Courier' as const,
    letterSpacing: 2,       // Widest tracking for labels
    textTransform: 'uppercase' as const,
  },
  
  // Labels/captions (monospace uppercase)
  label: {
    fontSize: 10,
    fontWeight: '500' as const,
    fontFamily: 'Courier' as const,
    letterSpacing: 2,       // Widest tracking
    textTransform: 'uppercase' as const,
  },
  caption: {
    fontSize: 11,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  
  // Agent name subtitle
  subtitle: {
    fontSize: 10,
    fontWeight: '400' as const,
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
  },
} as const;

export type Typography = typeof typography;
