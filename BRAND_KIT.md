# VONDR Brand Kit - React Native Implementation

**Source:** `vondr-pwa/client/src/components/BrandKitContent.tsx`

This document maps the VONDR PWA brand kit to React Native theme usage.

---

## Identity

**Wordmark:** VONDR  
- **Font:** Jost Light (PWA) → System Light (React Native)
- **Style:** Uppercase, wide tracking (letterSpacing: 4)
- **Usage:** `theme.typography.title`

**Etymology:**
1. Vǫndr (Old Norse) = "rod" or "stick" → ancestor of English "wand"
2. Also associated with "to wander or travel" (itinerant ancestor)

---

## Color Palettes

### UI Foundation
```typescript
theme.colors.background    // #09090b (zinc-950)
theme.colors.surface       // #18181b (zinc-900)
theme.colors.foreground    // #ffffff
theme.colors.muted         // #71717a (zinc-500)
theme.colors.border        // rgba(255, 255, 255, 0.1)
```

**Usage:**
- `background`: Main canvas/screen background
- `surface`: Cards, panels, elevated surfaces
- `foreground`: Primary text/icons
- `muted`: Secondary text, subdued elements
- `border`: Dividers, card borders

---

### Functional Palette
**For agent actions, status indicators, and badges**

```typescript
theme.colors.action = {
  planning: '#c084fc',      // Purple - Strategic/planning tasks
  analyzing: '#818cf8',     // Indigo - Data analysis
  research: '#60a5fa',      // Blue - Research/investigation
  docs: '#38bdf8',          // Sky - Documentation
  coding: '#a78bfa',        // Violet - Code generation
  generating: '#e879f9',    // Fuchsia - Content generation
  action: '#fbbf24',        // Amber - Action required
  system: '#34d399',        // Emerald - System messages
  alert: '#f87171',         // Red - Alerts/errors
  fileOps: '#94a3b8',       // Slate - File operations
}
```

**Usage Examples:**
- Agent activity badges: `backgroundColor: theme.colors.action.analyzing`
- Status pills: `borderColor: theme.colors.action.system`
- Action buttons: `color: theme.colors.action.action`

**Action Spectrum Gradient:**
```
From: #c084fc (planning) → To: #f87171 (alert)
```

---

### Orb Spectrum
**For orb state colors, ambient effects, and mood**

```typescript
theme.colors.orb = {
  pulse: '#ec4899',         // Pink - Pulsing/heartbeat
  synth: '#d946ef',         // Fuchsia - Synthetic/AI
  void: '#a855f7',          // Purple - Deep/mysterious
  deep: '#6366f1',          // Indigo - Depth/thinking
  core: '#3b82f6',          // Blue - Core state
  aether: '#0ea5e9',        // Sky - Ethereal/light
  data: '#06b6d4',          // Cyan - Data processing
  stream: '#14b8a6',        // Teal - Streaming content
  life: '#22c55e',          // Green - Active/alive
  energy: '#eab308',        // Yellow - High energy
}
```

**Usage Examples:**
- Orb border/glow: `shadowColor: theme.colors.orb.core`
- Pulse animations: `backgroundColor: theme.colors.orb.pulse`
- Ambient background: `overlayColor: theme.colors.orb.aether + '20'` (20% opacity)

**Orb Gradient Locus:**
```
From: #ec4899 (pulse) → To: #eab308 (energy)
```

---

## Typography

### Font Families
**PWA → React Native mapping**

| Usage              | PWA Font           | React Native      |
|--------------------|--------------------|-------------------|
| Headings/Display   | Inter Light        | System (Light)    |
| Body Copy          | Helvetica/Arial    | System (Default)  |
| Technical/Data     | JetBrains Mono     | Courier/Menlo     |

### Heading Styles
```typescript
theme.typography.h1    // 48px, light, uppercase, wide tracking
theme.typography.h2    // 30px, light, uppercase, wide tracking
theme.typography.h3    // 20px, light, uppercase, wide tracking
theme.typography.h4    // 18px, light, uppercase, wide tracking
```

**Characteristics:**
- Font weight: `300` (light)
- Text transform: `uppercase`
- Letter spacing: `2-3` (wide tracking)
- Color: `theme.colors.text.primary` (rgba(255, 255, 255, 0.9))

### Body Styles
```typescript
theme.typography.body        // 14px, regular, relaxed line height
theme.typography.bodyLarge   // 16px, regular, relaxed line height
theme.typography.bodySmall   // 12px, regular, relaxed line height
```

**Characteristics:**
- Font weight: `400` (regular)
- Line height: 1.5x font size (relaxed)
- Color: `theme.colors.muted` (#71717a) for body copy

### Technical Styles
```typescript
theme.typography.mono        // 12px, monospace, slight tracking
theme.typography.monoSmall   // 10px, monospace, wide tracking, uppercase
theme.typography.label       // 10px, monospace, wide tracking, uppercase
```

**Usage:**
- `mono`: Code snippets, technical data
- `monoSmall`: Labels, metadata
- `label`: Uppercase labels, category tags

---

## Interactive Elements

### Pulse States
```typescript
// Inactive/Idle
borderColor: theme.colors.muted
opacity: 0.5

// Processing
borderColor: theme.colors.orb.core
// Add animation: pulsing opacity/scale

// Active/Complete
borderColor: theme.colors.orb.pulse
// Add glow: shadowColor + shadowRadius
```

### Button Styles

**Primary (CTA):**
```typescript
backgroundColor: 'rgba(255, 255, 255, 0.05)'
borderColor: 'rgba(255, 255, 255, 0.6)'
color: theme.colors.foreground
// Hover: scale: 1.05, borderColor: 'rgba(255, 255, 255, 1)'
```

**Success:**
```typescript
backgroundColor: 'rgba(52, 211, 153, 0.1)'  // action.system + 10%
borderColor: 'rgba(52, 211, 153, 0.5)'
color: '#a7f3d0'  // emerald-200
```

**Danger:**
```typescript
backgroundColor: 'rgba(248, 113, 113, 0.1)'  // action.alert + 10%
borderColor: 'rgba(248, 113, 113, 0.5)'
color: '#fca5a5'  // red-200
```

**Info:**
```typescript
backgroundColor: 'rgba(96, 165, 250, 0.1)'   // action.research + 10%
borderColor: 'rgba(96, 165, 250, 0.5)'
color: '#93c5fd'  // blue-200
```

**Send Button:**
```typescript
// Default state
backgroundColor: theme.colors.foreground      // white
color: theme.colors.background               // black

// Hover state
backgroundColor: theme.colors.action.research  // #60a5fa
color: theme.colors.foreground                // white

// Disabled state
backgroundColor: 'rgba(255, 255, 255, 0.05)'
color: theme.colors.text.disabled
```

---

## Design Principles

1. **Deep blacks, subtle borders**
   - Primary background: `#09090b`
   - Borders: `rgba(255, 255, 255, 0.1)` or `0.05`

2. **Muted text for readability**
   - Body text: `#71717a` (not pure white)
   - Pure white only for emphasis

3. **Uppercase + wide tracking for labels**
   - Labels, headings: `textTransform: 'uppercase', letterSpacing: 2`

4. **Semantic color usage**
   - Use functional palette (`theme.colors.action.*`) for meaning
   - Use orb spectrum (`theme.colors.orb.*`) for mood/state

5. **Light font weights**
   - Headings: `fontWeight: '300'` (light)
   - Avoid heavy/bold in display text

6. **Backdrop blur + subtle opacity**
   - Overlays: `backgroundColor: 'rgba(0, 0, 0, 0.5)'` + blur
   - Surfaces: `backgroundColor: 'rgba(255, 255, 255, 0.05)'`

---

## Implementation Notes

### Safe Areas
- Always wrap in `<SafeAreaView>` or use `useSafeAreaInsets()`
- iPhone notch/status bar: add top inset
- Home indicator: add bottom inset

### Gradients
- Use `LinearGradient` from `expo-linear-gradient`
- Background gradient: `[colors.gradient.backgroundFrom, colors.gradient.backgroundVia, colors.gradient.backgroundTo]`
- Action spectrum: `[colors.action.planning, colors.action.alert]`
- Orb locus: `[colors.orb.pulse, colors.orb.energy]`

### Animations
- Target 60 FPS with `react-native-reanimated`
- Use `withTiming()`, `withSpring()` for smooth transitions
- Pulse effect: `withRepeat(withSequence(...))`
- Gesture-driven: `useAnimatedGestureHandler`

### Performance
- Minimize re-renders: use `memo()`, `useMemo()`, `useCallback()`
- Animated values: `useSharedValue()`, `useAnimatedStyle()`
- Native driver: always `useNativeDriver: true` when possible

---

## References

- PWA Source: `~/code/vondr-pwa/client/src/components/BrandKitContent.tsx`
- Theme Implementation: `~/code/VONDR-native/src/theme/`
- Components: `~/code/VONDR-native/src/components/`
