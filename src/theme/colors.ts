/**
 * VONDR Color System
 * Matching the PWA Brand Kit exactly
 * See: BrandKitContent.tsx in vondr-pwa
 */

export const colors = {
  // UI Foundation
  background: '#09090b',        // zinc-950
  surface: '#18181b',            // zinc-900
  foreground: '#ffffff',
  muted: '#71717a',             // zinc-500
  
  // Borders
  border: 'rgba(255, 255, 255, 0.1)',   // White 10%
  borderLight: 'rgba(255, 255, 255, 0.05)',
  
  // Text hierarchy
  text: {
    primary: 'rgba(255, 255, 255, 0.9)',
    secondary: 'rgba(255, 255, 255, 0.6)',
    muted: 'rgba(255, 255, 255, 0.4)',
    disabled: 'rgba(255, 255, 255, 0.2)',
  },
  
  // Functional Palette (agent actions)
  action: {
    planning: '#c084fc',      // Purple
    analyzing: '#818cf8',     // Indigo
    research: '#60a5fa',      // Blue
    docs: '#38bdf8',          // Sky
    coding: '#a78bfa',        // Violet
    generating: '#e879f9',    // Fuchsia
    action: '#fbbf24',        // Amber
    system: '#34d399',        // Emerald
    alert: '#f87171',         // Red
    fileOps: '#94a3b8',       // Slate
  },
  
  // Orb Spectrum (orb state colors)
  orb: {
    pulse: '#ec4899',         // Pink
    synth: '#d946ef',         // Fuchsia
    void: '#a855f7',          // Purple
    deep: '#6366f1',          // Indigo
    core: '#3b82f6',          // Blue
    aether: '#0ea5e9',        // Sky
    data: '#06b6d4',          // Cyan
    stream: '#14b8a6',        // Teal
    life: '#22c55e',          // Green
    energy: '#eab308',        // Yellow
  },
  
  // Legacy accent colors (for backwards compatibility)
  accent: {
    purple: '#a855f7',
    purpleLight: 'rgba(168, 85, 247, 0.2)',
    blue: '#3b82f6',
    blueLight: 'rgba(59, 130, 246, 0.2)',
    emerald: '#10b981',
    emeraldLight: 'rgba(16, 185, 129, 0.2)',
    red: '#ef4444',
    redLight: 'rgba(239, 68, 68, 0.2)',
    yellow: '#f59e0b',
    yellowLight: 'rgba(245, 158, 11, 0.2)',
  },
  
  // Gradients
  gradient: {
    // Action spectrum (functional palette)
    actionStart: '#c084fc',   // planning
    actionEnd: '#f87171',     // alert
    
    // Orb gradient locus
    orbStart: '#ec4899',      // pulse
    orbEnd: '#eab308',        // energy
    
    // Background gradient
    backgroundFrom: 'rgba(168, 85, 247, 0.2)',  // Purple glow
    backgroundVia: '#09090b',
    backgroundTo: '#09090b',
  },
  
  // Status colors (using functional palette)
  status: {
    success: '#34d399',       // action.system
    error: '#f87171',         // action.alert
    warning: '#fbbf24',       // action.action
    info: '#60a5fa',          // action.research
  },
} as const;

export type Colors = typeof colors;
