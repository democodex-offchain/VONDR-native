# VONDR-Native - React Native Migration Plan

**Created:** 2026-02-13  
**Goal:** Replicate VONDR PWA interface in React Native with identical UX

---

## Architecture Overview

### Technology Stack

**Core:**
- React Native 0.80+ with TypeScript
- Expo SDK (for easier development)

**Animation & Gestures:**
- `react-native-reanimated` - 60 FPS native animations
- `react-native-gesture-handler` - Touch gestures
- `moti` - Declarative animations
- `@shopify/react-native-skia` - Custom graphics (orb effects)

**UI Components:**
- `@gorhom/bottom-sheet` - Drawers & modals
- `react-native-svg` - Vector graphics
- Custom components with styled-system approach

**State Management:**
- React Context + Hooks
- TanStack Query for server state

**Utilities:**
- `react-native-haptic-feedback` - Touch feedback
- `@react-native-community/blur` - Blur effects
- `lottie-react-native` - Icon animations

---

## UI Component Hierarchy

```
App
├── MainCanvas (Central view with gradient)
│   ├── Header (VONDR title + agent name)
│   ├── CentralOrb (Voice interaction)
│   ├── PulseIcon (Top-right status indicator)
│   └── FloatingMenus
│       ├── BottomActionMenu (Add doc, photo, etc.)
│       └── DebugTranscriptPanel (Draggable)
│
├── LeftMenuDrawer (Slide from left)
│   ├── MainMenu (Agents, Sessions, Settings, etc.)
│   └── SubMenuPanels
│       ├── SessionsPanel
│       ├── SettingsPanel
│       ├── IntegrationsPanel
│       └── DemoPanel
│
├── RightDrawer (Agent stream - slide from right)
│   ├── MessageCanvas (Conversation view)
│   └── FollowUpInput (Text input at bottom)
│
├── AgentSelectorDrawer (Pulldown from top)
│   └── AgentList (Grid of agent cards)
│
└── TextInputOverlay (Full-screen text input)
    ├── AttachmentChips
    └── TextArea
```

---

## Phase 1: Skeleton Structure

### Goals:
- ✅ Create project structure
- ✅ Install all dependencies
- ✅ Build main canvas with gradient
- ✅ Implement left menu drawer (no content)
- ✅ Implement right drawer (no content)
- ✅ Add agent selector pulldown (no content)
- ✅ Add floating menu placeholders
- ✅ Style to match VONDR PWA aesthetic

### File Structure:
```
src/
├── components/
│   ├── MainCanvas.tsx
│   ├── Header.tsx
│   ├── CentralOrb.tsx
│   ├── PulseIcon.tsx
│   ├── LeftMenuDrawer/
│   │   ├── index.tsx
│   │   ├── MainMenu.tsx
│   │   └── SubMenuPanels.tsx
│   ├── RightDrawer/
│   │   ├── index.tsx
│   │   └── MessageCanvas.tsx
│   ├── AgentSelectorDrawer.tsx
│   ├── FloatingMenus/
│   │   ├── index.tsx
│   │   ├── BottomActionMenu.tsx
│   │   └── DebugPanel.tsx
│   └── TextInputOverlay.tsx
├── hooks/
│   ├── useMenuState.ts
│   └── useGestures.ts
├── theme/
│   ├── colors.ts
│   ├── typography.ts
│   └── spacing.ts
└── App.tsx
```

---

## Design System (Matching PWA)

### Colors:
```typescript
const colors = {
  background: '#0a0a0a',        // Deep black
  surface: '#18181b',            // Zinc-900
  surfaceLight: '#27272a',       // Zinc-800
  border: 'rgba(255,255,255,0.1)', // White 10% opacity
  text: {
    primary: 'rgba(255,255,255,0.9)',
    secondary: 'rgba(255,255,255,0.5)',
    muted: 'rgba(255,255,255,0.3)',
  },
  accent: {
    purple: '#a855f7',
    blue: '#3b82f6',
    emerald: '#10b981',
    red: '#ef4444',
  },
  gradient: {
    from: 'rgba(168, 85, 247, 0.2)',  // Purple
    via: '#0a0a0a',
    to: '#0a0a0a',
  }
};
```

### Typography:
```typescript
const typography = {
  title: {
    fontFamily: 'Jost',          // Need to add custom font
    fontSize: 48,
    fontWeight: '300',           // Light
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  body: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
  },
  mono: {
    fontFamily: 'JetBrains Mono', // For code/transcript
    fontSize: 12,
  }
};
```

### Spacing:
```typescript
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
```

---

## Gesture Patterns

### Tap Gestures:
- **Single Tap (bottom 20% of screen):** Toggle bottom menu
- **Double Tap (bottom 20%):** Open left menu
- **Tap outside:** Close open menus/overlays

### Swipe Gestures:
- **Swipe Right (from left edge):** Open left menu
- **Swipe Left (from right edge):** Open right drawer (if content available)
- **Swipe Down (on orb):** Open agent selector

### Drag Gestures:
- **Debug Panel:** Free drag anywhere on screen
- **Drawer dismiss:** Swipe down on drawer handle

---

## Animation Specifications

### Left Menu Drawer:
- **Enter:** Slide from left + fade in (300ms, easeOut)
- **Exit:** Slide to left + fade out (250ms, easeIn)
- **Width:** 80% on mobile, 320px on tablet

### Right Drawer:
- **Enter:** Slide from right (300ms, easeOut)
- **Exit:** Slide to right (250ms, easeIn)
- **Width:** 90% on mobile, 400px on tablet

### Agent Selector:
- **Enter:** Slide from top + fade in (300ms, easeOut)
- **Exit:** Slide to top + fade out (250ms, easeIn)
- **Height:** 60% of screen

### Orb Interactions:
- **Idle:** Subtle pulse (2s loop)
- **Recording:** Expanding pulse (800ms loop, red glow)
- **Processing:** Spinning gradient (1.5s loop)

---

## State Management

### Menu State:
```typescript
interface MenuState {
  isLeftMenuOpen: boolean;
  isRightDrawerOpen: boolean;
  isAgentSelectorOpen: boolean;
  isTextInputOpen: boolean;
  isBottomMenuOpen: boolean;
  activeSubMenu: SubMenuType | null;
  selectedSession: Session | null;
}
```

### Agent State:
```typescript
interface AgentState {
  selectedAgent: string;
  isRecording: boolean;
  pulseStatus: 'idle' | 'processing' | 'active';
  activities: Activity[];
  userMessages: UserMessage[];
}
```

---

## Next Steps (Phase 1)

1. ✅ Initialize project
2. Install dependencies
3. Set up theme system
4. Build MainCanvas with gradient background
5. Implement Header component
6. Add placeholder CentralOrb
7. Build LeftMenuDrawer shell
8. Build RightDrawer shell
9. Add AgentSelectorDrawer shell
10. Add FloatingMenus placeholders
11. Wire up basic navigation state
12. Test on iOS simulator

**Estimated Time:** 4-6 hours for Phase 1 skeleton

---

## Dependencies to Install

```bash
# Core navigation/gestures/animation
npm install react-native-reanimated react-native-gesture-handler @gorhom/bottom-sheet moti

# UI utilities
npm install react-native-svg react-native-haptic-feedback @react-native-community/blur

# State management
npm install @tanstack/react-query zustand

# Graphics (optional, for advanced effects)
npm install @shopify/react-native-skia lottie-react-native

# Utilities
npm install react-native-safe-area-context
```

---

**Status:** Phase 1 in progress - Creating project structure
