/**
 * LeftMenuDrawer - Matches PWA design exactly
 * - Dark background (zinc-900)
 * - VONDR header with agent name
 * - Menu items with icons + chevrons
 * - LOG OUT at bottom
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { 
  X, 
  Bot, 
  MessageSquare, 
  Settings, 
  Plug, 
  Palette, 
  FileText, 
  ChevronRight,
  LogOut 
} from 'lucide-react-native';
import { colors, typography, spacing } from '../../theme';
import AgentsPanel from './AgentsPanel';
import { DRAWER_WIDTH } from './constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  hasSubMenu: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'agents', label: 'AGENTS', icon: Bot, hasSubMenu: true },
  { id: 'sessions', label: 'SESSIONS', icon: MessageSquare, hasSubMenu: true },
  { id: 'settings', label: 'SETTINGS', icon: Settings, hasSubMenu: true },
  { id: 'integrations', label: 'INTEGRATIONS', icon: Plug, hasSubMenu: true },
  { id: 'ui-kit', label: 'UI KIT', icon: Palette, hasSubMenu: true },
  { id: 'read-me', label: 'READ ME', icon: FileText, hasSubMenu: true },
];

interface LeftMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAgent?: string;
  onSelectAgent?: (agent: string) => void;
  onMenuItemPress?: (item: string) => void;
  activeSubMenu?: string | null;
}

export default function LeftMenuDrawer({ 
  isOpen, 
  onClose, 
  selectedAgent = 'ARYA',
  onSelectAgent,
  onMenuItemPress,
  activeSubMenu: controlledActiveSubMenu = null 
}: LeftMenuDrawerProps) {
  const [localActiveSubMenu, setLocalActiveSubMenu] = React.useState<string | null>(null);
  const translateX = useSharedValue(-DRAWER_WIDTH);
  const insets = useSafeAreaInsets();

  // Use controlled or local state
  const activeSubMenu = controlledActiveSubMenu !== null ? controlledActiveSubMenu : localActiveSubMenu;
  
  const handleMenuItemClick = (itemId: string) => {
    // Toggle submenu: close if already open, open if closed
    const newActiveSubMenu = activeSubMenu === itemId ? null : itemId;
    setLocalActiveSubMenu(newActiveSubMenu);
    // Don't navigate to full page - just toggle sub-menu
  };

  // Animate drawer open/close
  React.useEffect(() => {
    translateX.value = withTiming(
      isOpen ? 0 : -DRAWER_WIDTH,
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
  }));

  // Swipe left to close
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX < 0) {
        translateX.value = Math.max(-DRAWER_WIDTH, event.translationX);
      }
    })
    .onEnd((event) => {
      if (event.translationX < -DRAWER_WIDTH / 3 || event.velocityX < -500) {
        translateX.value = withTiming(-DRAWER_WIDTH, { duration: 250 }, (finished) => {
          if (finished) {
            runOnJS(onClose)();
          }
        });
      } else {
        translateX.value = withTiming(0, { duration: 250 });
      }
    });

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, backdropStyle]} pointerEvents={isOpen ? 'auto' : 'none'}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
        />
      </Animated.View>

      {/* Drawer */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.drawer, drawerStyle]}>
          {/* Header */}
          <View style={[styles.header, { paddingTop: insets.top + spacing.xs }]}>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>VONDR</Text>
              <View style={styles.closeButtonContainer}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <X size={16} color={colors.text.secondary} />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.agentName}>{selectedAgent}</Text>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {MENU_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleMenuItemClick(item.id)}
              >
                <View style={styles.menuItemLeft}>
                  <item.icon 
                    size={16} 
                    color={activeSubMenu === item.id ? colors.text.primary : colors.text.secondary} 
                  />
                  <Text 
                    style={[
                      styles.menuItemText,
                      activeSubMenu === item.id && styles.menuItemTextActive
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
                {item.hasSubMenu && (
                  <ChevronRight 
                    size={16} 
                    color={activeSubMenu === item.id ? colors.text.primary : 'rgba(255, 255, 255, 0.3)'} 
                    style={activeSubMenu === item.id && { transform: [{ rotate: '90deg' }] }}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Log Out Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                // Handle logout
                onClose();
              }}
            >
              <LogOut size={16} color={colors.text.secondary} />
              <Text style={styles.logoutText}>LOG OUT</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </GestureDetector>

      {/* Agents Panel */}
      <AgentsPanel
        isOpen={activeSubMenu === 'agents'}
        selectedAgent={selectedAgent}
        onSelectAgent={(agent) => {
          onSelectAgent?.(agent);
          onClose();
        }}
        onClose={onClose}
      />
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 50,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#18181b', // zinc-900
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.05)',
    zIndex: 51,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    // paddingTop applied dynamically with safe area insets
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  closeButtonContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: -20,
  },
  closeButton: {
    padding: spacing.xs,
    borderRadius: 100,
  },
  agentName: {
    fontFamily: 'Courier New',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuItemText: {
    fontFamily: 'Courier New',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    color: colors.text.secondary,
  },
  menuItemTextActive: {
    color: colors.text.primary,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  logoutText: {
    fontFamily: 'Courier New',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    color: colors.text.secondary,
  },
});
