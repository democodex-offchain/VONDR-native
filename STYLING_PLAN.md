# VONDR-Native Styling Recreation Plan

**Date:** 2026-02-13  
**Goal:** Recreate VONDR PWA styling exactly in React Native

---

## 📐 Design System Analysis (From PWA)

### Colors:
```typescript
background: '#0a0a0a'        // Deep black
surface: '#18181b'           // zinc-900
surfaceLight: '#27272a'      // zinc-800  
border: 'rgba(255,255,255,0.05)' // white/5
borderMedium: 'rgba(255,255,255,0.1)' // white/10
text: {
  primary: 'rgba(255,255,255,0.9)',    // white/90
  secondary: 'rgba(255,255,255,0.6)',  // white/60
  muted: 'rgba(255,255,255,0.4)',      // muted-foreground
}
accent: {
  emerald: '#10b981',
  red: '#ef4444',
  amber: '#f59e0b',
  blue: '#3b82f6',
}
```

### Typography:
```typescript
title: {
  fontFamily: 'Inter',
  fontWeight: '300',      // font-light
  fontSize: 32,           // text-3xl
  letterSpacing: 2,       // tracking-wider
  textTransform: 'uppercase',
}
mono: {
  fontFamily: 'Courier',  // font-mono
  fontSize: 10,           // text-[10px]
  letterSpacing: 3,       // tracking-widest
  textTransform: 'uppercase',
}
body: {
  fontFamily: 'Inter',
  fontSize: 12,           // text-xs
}
```

### Spacing:
```
p-2: 8px
p-3: 12px
p-4: 16px
p-5: 20px
gap-2: 8px
gap-3: 12px
gap-4: 16px
```

### Border Radius:
```
rounded: 4px
rounded-lg: 8px
rounded-full: 9999px
```

---

## 📋 Phase 1: Left Menu Styling

### 1.1 Main Menu Panel (200px width)

**Current State:** Basic drawer with placeholder items  
**Target Style:** Dark panel with elegant spacing

#### Layout:
```
Container:
- Width: 200px (fixed)
- Background: #18181b (zinc-900)
- Border: 1px right, rgba(255,255,255,0.05)
- Shadow: 2xl
```

#### Header Section:
```
Padding: 20px
Flex: column
Gap: 4px

Title:
- Font: Inter, light (300)
- Size: 32px
- Tracking: wider (2px)
- Transform: uppercase
- Color: rgba(255,255,255,0.9)

Close Button:
- Position: absolute right
- Size: 16px icon
- Padding: 4px
- Hover: bg rgba(255,255,255,0.05)
- Border-radius: full

Agent Name (subtitle):
- Font: mono
- Size: 10px
- Transform: uppercase
- Tracking: widest (3px)
- Color: muted
- Margin-top: 4px
```

#### Menu Items:
```
Container:
- Padding: 20px
- Gap: 24px (space-y-6)

Each Item:
- Flex-direction: row
- Align-items: center
- Gap: 12px
- Padding: 0
- No background (transparent)

Icon:
- Size: 16px
- Color: rgba(255,255,255,0.4)
- Hover: rgba(255,255,255,1)

Text:
- Font: mono
- Size: 12px
- Transform: uppercase
- Tracking: widest
- Color: rgba(255,255,255,0.4)
- Hover: rgba(255,255,255,1)

Transition: 200ms ease
```

#### Footer (Logout):
```
Height: 70px (fixed)
Border-top: 1px, rgba(255,255,255,0.05)
Background: #18181b
Padding: 0 20px
Align-items: center
```

### 1.2 Sub-Menu Panel (240px width)

**Target:** Right-side expandable panel

#### Layout:
```
Position: absolute
Left: 200px (after main menu)
Width: 240px
Background: rgba(24,24,27,0.95) with backdrop-blur
Border-right: 1px, rgba(255,255,255,0.05)
Shadow: xl
```

#### Header:
```
Padding: 20px
Border-bottom: 1px, rgba(255,255,255,0.05)

Title:
- Font: Inter light
- Size: 20px
- Transform: uppercase
- Tracking: wider
- Color: rgba(255,255,255,0.9)
```

#### Content Area:
```
Padding: 8px
Overflow: scroll
ScrollIndicator: thin
```

#### List Items (Sessions):
```
Padding: 8px 16px
Border-radius: 0
Transition: all 150ms
Background: transparent
Hover: rgba(255,255,255,0.05)
Active/Selected: rgba(255,255,255,0.1)

Title:
- Font: mono
- Size: 12px
- Weight: medium
- Color: white/90 (selected) or muted (unselected)
- Line-height: tight
- Tracking: tight

Metadata Row:
- Flex: row
- Justify: space-between
- Margin-top: 4px

Date:
- Font: mono
- Size: 10px
- Transform: uppercase
- Color: white/70 (selected) or muted (unselected)

Tokens/Cost:
- Font: mono
- Size: 10px
- Color: white/50 (selected) or muted-dark (unselected)
```

---

## 📋 Phase 2: Menu Item Pages Styling

### 2.1 Settings Page

**Components:**
- Section headers
- Form inputs
- Status indicators
- Buttons

#### Section Header:
```
Font: Inter light
Size: 18px
Transform: uppercase
Tracking: wide
Color: rgba(255,255,255,0.9)
Margin-bottom: 24px
```

#### Form Field:
```
Container:
- Display: flex
- Flex-direction: column
- Gap: 8px

Label:
- Font: mono
- Size: 10px
- Transform: uppercase
- Tracking: widest
- Color: muted

Input:
- Background: #0a0a0a (zinc-950)
- Border: 1px, rgba(255,255,255,0.1)
- Color: white
- Font: mono
- Size: 12px
- Height: 48px
- Padding: 0 16px
- Border-radius: 8px
- Focus: border rgba(255,255,255,0.3)
```

#### Status Card:
```
Container:
- Padding: 16px
- Border-radius: 8px
- Border: 1px
- Min-height: 56px
- Flex: row
- Align-items: center
- Gap: 12px

States:
- Idle: border rgba(255,255,255,0.1), bg transparent
- Success: border rgba(16,185,129,0.5), bg rgba(16,185,129,0.1)
- Error: border rgba(239,68,68,0.5), bg rgba(239,68,68,0.1)
- Testing: border rgba(59,130,246,0.5), bg rgba(59,130,246,0.1)

Icon:
- Size: 20px
- Colors match state (emerald/red/blue/amber)

Text:
- Title: mono, 12px, uppercase, tracking-widest, white
- Subtitle: mono, 10px, muted or status-color
```

#### Buttons:
```
Primary:
- Background: zinc-950
- Border: 1px, rgba(255,255,255,0.1)
- Text: white
- Hover: border rgba(255,255,255,0.3)
- Height: 56px
- Padding: 0 16px
- Border-radius: 8px

Action (Test/Auth):
- Background: rgba(59,130,246,0.1)
- Border: rgba(59,130,246,0.3)
- Text: rgba(59,130,246,1)
- Hover: bg rgba(59,130,246,0.2), border rgba(59,130,246,0.5)
- Height: 56px
- Border-radius: 8px

Danger:
- Background: rgba(239,68,68,0.1)
- Border: rgba(239,68,68,0.3)
- Text: rgba(239,68,68,1)
- Hover: bg rgba(239,68,68,0.2), border rgba(239,68,68,0.5)
```

### 2.2 Sessions Page

#### Session Details View:
```
Header:
- Title: Session date/time
- Metadata: Agent, tokens, cost
- Border-bottom: 1px, rgba(255,255,255,0.05)

Stats Bar:
- Flex: row
- Justify: space-between
- Padding: 12px 16px
- Background: rgba(255,255,255,0.02)

Message List:
- Padding: 16px
- Gap: 12px
- ScrollView

Message Bubble:
- User: align right, bg rgba(168,85,247,0.2), border rgba(168,85,247,0.5)
- Agent: align left, bg rgba(24,24,27,1), border rgba(255,255,255,0.1)
- Padding: 12px 16px
- Border-radius: 8px
- Font: mono, 12px
```

### 2.3 Integrations Page

#### Integration Card:
```
Container:
- Padding: 16px
- Border-radius: 12px
- Border: 1px, rgba(255,255,255,0.1)
- Background: rgba(255,255,255,0.02)
- Hover: border rgba(255,255,255,0.2)

Icon:
- Size: 32px
- Color: accent (based on service)

Title:
- Font: Inter, medium (500)
- Size: 16px
- Color: white

Description:
- Font: Inter
- Size: 12px
- Color: muted
- Line-height: relaxed

Status Badge:
- Padding: 4px 8px
- Border-radius: 4px
- Font: mono, 10px
- Connected: bg emerald/10, text emerald, border emerald/30
- Disconnected: bg muted/10, text muted, border muted/30
```

---

## 📋 Phase 3: Floating Components Styling

### 3.1 Bottom Action Menu

```
Container:
- Position: absolute
- Bottom: 32px
- Left: 24px
- Right: 24px
- Background: #18181b (surface)
- Border: 1px, rgba(255,255,255,0.1)
- Border-radius: 16px
- Padding: 16px 24px
- Shadow: large
- Backdrop-blur: xl

Row:
- Flex-direction: row
- Justify-content: space-around
- Align-items: center

Button:
- Align-items: center
- Gap: 4px
- Padding: 0

Icon:
- Size: 20px
- Color: rgba(255,255,255,0.6)

Label:
- Font: mono
- Size: 10px
- Transform: uppercase
- Letter-spacing: 2px
- Color: rgba(255,255,255,0.4)
```

### 3.2 Debug Transcript Panel

```
Container:
- Position: absolute
- Width: 250px
- Height: 300px
- Background: rgba(24,24,27,0.95)
- Backdrop-blur: xl
- Border: 1px, rgba(255,255,255,0.1)
- Border-radius: 12px
- Shadow: 2xl
- Draggable: true

Header:
- Flex: row
- Justify: space-between
- Align: center
- Padding: 12px 16px
- Border-bottom: 1px, rgba(255,255,255,0.1)
- Background: rgba(0,0,0,0.2)
- Cursor: move (drag handle)

Title:
- Font: mono
- Size: 10px
- Transform: uppercase
- Tracking: widest
- Color: rgba(255,255,255,0.9)

Voice Meter:
- Flex: row
- Gap: 1px
- Height: 12px
- Align: flex-end

Bars (5 bars):
- Width: 2px
- Heights: 4px, 6px, 8px, 10px, 12px
- Border-radius: full
- Colors:
  - Active: #ef4444 (red)
  - Paused: #71717a (zinc-600)
  - Inactive: #3f3f46 (zinc-700, opacity 0.3)

Recording Indicator:
- Dot: 6px, rounded-full, bg red-500, animate pulse
- Text: "REC", mono, 8px, uppercase, tracking-widest, red-400

Content:
- Padding: 16px
- Height: 320px (minus header)
- Overflow: scroll
- ScrollIndicator: thin

Text:
- Font: mono
- Size: 11px
- Color: rgba(255,255,255,0.8)
- Line-height: relaxed
```

---

## 📋 Phase 4: Right Drawer (Agent Stream) Styling

### 4.1 Drawer Container

```
Position: absolute
Top: 0
Right: 0
Bottom: 0
Width: 90% (mobile) or 400px (desktop max)
Background: #18181b
Border-left: 1px, rgba(255,255,255,0.1)
Shadow: left, large
Z-index: 51
```

### 4.2 Header

```
Flex: row
Justify: space-between
Align: center
Padding: 32px 24px
Border-bottom: 1px, rgba(255,255,255,0.1)

Title:
- Font: Inter, light
- Size: 24px
- Color: rgba(255,255,255,0.9)

Close Button:
- Size: 20px icon
- Padding: 8px
- Color: rgba(255,255,255,0.6)
- Hover: rgba(255,255,255,1)
```

### 4.3 Message Canvas

```
Content Area:
- Flex: 1
- Padding: 24px
- Overflow: scroll

Message Groups:
- Gap: 12px

User Message:
- Align: flex-end
- Max-width: 80%
- Padding: 12px 16px
- Background: rgba(168,85,247,0.2)
- Border: 1px, rgba(168,85,247,0.5)
- Border-radius: 12px
- Font: mono, 12px
- Color: white/90

Agent Message:
- Align: flex-start
- Max-width: 85%
- Padding: 12px 16px
- Background: rgba(39,39,42,1)  // zinc-800
- Border: 1px, rgba(255,255,255,0.1)
- Border-radius: 12px
- Font: mono, 12px
- Color: white/80

Activity Indicator:
- Padding: 8px 12px
- Background: rgba(255,255,255,0.02)
- Border: 1px, rgba(255,255,255,0.05)
- Border-radius: 8px
- Font: mono, 10px
- Color: muted
- Flex: row
- Gap: 8px
- Align: center

Status Icons:
- analyzing: spinner (blue)
- thinking: brain (blue)
- tool: wrench (yellow)
- answer: check (emerald)
```

### 4.4 Follow-Up Input

```
Container:
- Position: absolute
- Bottom: 0
- Left: 0
- Right: 0
- Padding: 16px 24px
- Background: #18181b
- Border-top: 1px, rgba(255,255,255,0.1)

Input Row:
- Flex: row
- Gap: 12px
- Align: center

TextInput:
- Flex: 1
- Background: #0a0a0a (zinc-950)
- Border: 1px, rgba(255,255,255,0.1)
- Color: white
- Font: mono, 12px
- Padding: 12px 16px
- Border-radius: 8px
- Placeholder: rgba(255,255,255,0.3)

Send Button:
- Width: 48px
- Height: 48px
- Border-radius: 8px
- Background: rgba(168,85,247,0.2)
- Border: 1px, rgba(168,85,247,0.5)
- Icon: 20px, color purple

Mic Button (voice input):
- Width: 48px
- Height: 48px
- Border-radius: 8px
- Background: rgba(59,130,246,0.1)
- Border: 1px, rgba(59,130,246,0.3)
- Icon: 20px, color blue
- Active (recording): bg red/10, border red/30, icon red
```

---

## 🛠️ Implementation Strategy

### Safe Modifications:
✅ Colors, fonts, spacing (safe)
✅ Border styles, shadows (safe)
✅ Icon sizes and colors (safe)
✅ Text styles (safe)
✅ Padding/margin adjustments (safe)
✅ Background colors/opacity (safe)

### DO NOT MODIFY:
❌ Drawer animation logic (react-native-reanimated)
❌ Gesture handlers (react-native-gesture-handler)
❌ useSharedValue, withTiming, withSpring (keep as-is)
❌ Pan/Tap gesture configurations
❌ translateX/translateY animation values
❌ GestureDetector wrappers

### Component Library Usage:
- ✅ Use existing Animated.View for all animations
- ✅ Keep gesture handlers intact
- ✅ Use StyleSheet.create for all styles
- ✅ lucide-react-native for icons (already installed)
- ✅ No new dependencies needed

---

## 📦 Deliverables Per Phase

### Phase 1 Deliverables:
1. Updated LeftMenuDrawer with PWA styling
2. Sub-menu panel styling
3. Menu item interactions
4. Logout footer

### Phase 2 Deliverables:
1. Settings page with form styling
2. Sessions page with message list
3. Integrations page with card grid
4. All menu item pages styled

### Phase 3 Deliverables:
1. Bottom action menu styled
2. Debug transcript panel styled
3. Draggable panel interactions
4. Voice meter animations

### Phase 4 Deliverables:
1. Right drawer header styled
2. Message canvas with bubbles
3. Follow-up input bar
4. Voice input button states

---

## ✅ Success Criteria

Each phase complete when:
- ✅ Visual match to PWA (90%+ accuracy)
- ✅ No animation/gesture breakage
- ✅ Smooth 60 FPS performance
- ✅ All interactions working
- ✅ No runtime errors
- ✅ Dark theme consistent
- ✅ Typography matches PWA
- ✅ Spacing/padding accurate

---

**Ready to begin Phase 1: Left Menu Styling**
