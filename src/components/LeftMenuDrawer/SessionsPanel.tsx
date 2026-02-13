/**
 * SessionsPanel - Shows list of conversation sessions
 * Slides in as right panel next to the main menu
 * Width: Dynamically fills remaining screen width after left menu
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

interface Session {
  id: string;
  title: string;
  agentName: string;
  createdAt: string;
  userEmail?: string;
}

// Mock sessions data (will be replaced with real data later)
const MOCK_SESSIONS: Session[] = [
  {
    id: '1',
    title: 'Product roadmap discussion for Q2 2026',
    agentName: 'XEO',
    createdAt: '2026-02-13T10:30:00Z',
    userEmail: 'scott@xola.com',
  },
  {
    id: '2',
    title: 'Marketing campaign analysis',
    agentName: 'Marketing',
    createdAt: '2026-02-12T15:45:00Z',
    userEmail: 'scott@xola.com',
  },
  {
    id: '3',
    title: 'Sales pipeline review',
    agentName: 'Sales',
    createdAt: '2026-02-11T09:20:00Z',
    userEmail: 'scott@xola.com',
  },
  {
    id: '4',
    title: 'Customer support metrics',
    agentName: 'Support',
    createdAt: '2026-02-10T14:00:00Z',
    userEmail: 'scott@xola.com',
  },
];

interface SessionsPanelProps {
  isOpen: boolean;
  selectedSessionId?: string | null;
  onSelectSession?: (session: Session) => void;
  onClose: () => void;
}

export default function SessionsPanel({ 
  isOpen, 
  selectedSessionId,
  onSelectSession,
  onClose 
}: SessionsPanelProps) {
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
          runOnJS(setShouldRender)(false);
        }
      });
    }
  }, [isOpen, shouldRender]);

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (!shouldRender) return null;

  return (
    <Animated.View style={[styles.panel, panelStyle]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Text style={styles.headerTitle}>SESSIONS</Text>
      </View>

      {/* Sessions List */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_SESSIONS.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No sessions yet</Text>
          </View>
        ) : (
          MOCK_SESSIONS.map((session) => {
            const isSelected = selectedSessionId === session.id;
            return (
              <TouchableOpacity
                key={session.id}
                style={[
                  styles.sessionButton,
                  isSelected && styles.sessionButtonActive
                ]}
                onPress={() => {
                  onSelectSession?.(session);
                  // Don't call onClose() here - let parent handle menu closing
                }}
              >
                {/* Session Title */}
                <Text
                  style={[
                    styles.sessionTitle,
                    isSelected && styles.sessionTitleActive
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {session.title}
                </Text>
                
                {/* Agent Name & Date */}
                <View style={styles.sessionMeta}>
                  <Text
                    style={[
                      styles.sessionAgent,
                      isSelected && styles.sessionAgentActive
                    ]}
                  >
                    {session.agentName}
                  </Text>
                  <Text
                    style={[
                      styles.sessionDate,
                      isSelected && styles.sessionDateActive
                    ]}
                  >
                    {formatDate(session.createdAt)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
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
    paddingVertical: spacing.sm,
    paddingBottom: spacing.xl * 3, // Extra padding at bottom
  },
  sessionButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  sessionButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  sessionTitle: {
    fontFamily: 'Courier New',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: -0.2,
    lineHeight: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  sessionTitleActive: {
    color: 'rgba(255, 255, 255, 1)',
  },
  sessionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  sessionAgent: {
    fontFamily: 'Courier New',
    fontSize: 10,
    textTransform: 'uppercase',
    color: colors.text.secondary,
  },
  sessionAgentActive: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  sessionDate: {
    fontFamily: 'Courier New',
    fontSize: 10,
    color: 'rgba(156, 163, 175, 0.7)', // Very muted
  },
  sessionDateActive: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  emptyState: {
    paddingVertical: spacing.xl * 2,
    alignItems: 'center',
  },
  emptyStateText: {
    fontFamily: 'Courier New',
    fontSize: 12,
    color: colors.text.secondary,
  },
});
