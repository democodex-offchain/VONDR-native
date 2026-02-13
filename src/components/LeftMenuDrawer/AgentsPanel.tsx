/**
 * AgentsPanel - Shows list of available agents
 * Slides in as right panel next to the main menu
 * Width: Dynamically fills remaining screen width after left menu
 * (If left menu is 200px on a 400px screen, panel will be 200px)
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { colors, typography, spacing } from '../../theme';
import { DRAWER_WIDTH } from './constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PANEL_WIDTH = SCREEN_WIDTH - DRAWER_WIDTH; // Fill remaining screen width dynamically

const AGENTS = [
  'XEO',
  'Executive',
  'Ops',
  'Data',
  'Marketing',
  'Sales',
  'Implementation',
  'Support',
  'Success',
  'Legal',
];

interface AgentsPanelProps {
  isOpen: boolean;
  selectedAgent: string;
  onSelectAgent: (agent: string) => void;
  onClose: () => void;
}

export default function AgentsPanel({ 
  isOpen, 
  selectedAgent, 
  onSelectAgent,
  onClose 
}: AgentsPanelProps) {
  const translateX = useSharedValue(-PANEL_WIDTH);
  const [shouldRender, setShouldRender] = React.useState(false);
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      translateX.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.exp),
      });
    } else if (shouldRender) {
      translateX.value = withTiming(-PANEL_WIDTH, {
        duration: 300,
        easing: Easing.in(Easing.exp),
      }, (finished) => {
        if (finished) {
          // Unmount after animation completes
          runOnJS(setShouldRender)(false);
        }
      });
    }
  }, [isOpen, shouldRender]);

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  if (!shouldRender) return null;

  return (
    <Animated.View style={[styles.panel, panelStyle]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Text style={styles.headerTitle}>AGENTS</Text>
      </View>

      {/* Agent List */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {AGENTS.map((agent) => {
          const isSelected = selectedAgent === agent;
          return (
            <TouchableOpacity
              key={agent}
              style={[
                styles.agentButton,
                isSelected && styles.agentButtonActive
              ]}
              onPress={() => {
                onSelectAgent(agent);
                onClose();
              }}
            >
              <Text
                style={[
                  styles.agentText,
                  isSelected && styles.agentTextActive
                ]}
              >
                {agent}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    top: 0,
    left: DRAWER_WIDTH, // Right next to main menu
    bottom: 0,
    width: PANEL_WIDTH,
    backgroundColor: 'rgba(24, 24, 27, 0.95)', // zinc-900 with 95% opacity
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.05)',
    zIndex: 50, // Behind main menu (main menu is 51)
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  headerTitle: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '300',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    paddingBottom: spacing.xl * 3, // Extra padding at bottom
  },
  agentButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: 4,
    marginBottom: spacing.sm,
  },
  agentButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  agentText: {
    fontFamily: 'Courier New',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    color: colors.text.secondary,
  },
  agentTextActive: {
    color: colors.text.primary,
  },
});
