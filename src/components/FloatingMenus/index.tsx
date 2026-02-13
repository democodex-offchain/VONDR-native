/**
 * FloatingMenus - Bottom action menu + draggable debug panel
 * Phase 1: Placeholders with styling only
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { PlusCircle, Paperclip, Camera, Image as ImageIcon } from 'lucide-react-native';
import ActionBadge from '../ActionBadge';
import { colors, typography, spacing, borderRadius } from '../../theme';

interface FloatingMenusProps {
  isBottomMenuVisible?: boolean;
  isDebugVisible?: boolean;
}

export default function FloatingMenus({
  isBottomMenuVisible = false,
  isDebugVisible = false,
}: FloatingMenusProps) {
  if (!isBottomMenuVisible && !isDebugVisible) return null;

  return (
    <>
      {/* Bottom Action Menu */}
      {isBottomMenuVisible && (
        <View style={styles.bottomMenu}>
          <View style={styles.menuRow}>
            <TouchableOpacity style={styles.menuButton}>
              <PlusCircle size={20} color={colors.text.secondary} />
              <Text style={styles.menuButtonText}>Type</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuButton}>
              <Paperclip size={20} color={colors.text.secondary} />
              <Text style={styles.menuButtonText}>Doc</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuButton}>
              <Camera size={20} color={colors.text.secondary} />
              <Text style={styles.menuButtonText}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuButton}>
              <ImageIcon size={20} color={colors.text.secondary} />
              <Text style={styles.menuButtonText}>Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Debug Transcript Panel (draggable placeholder) */}
      {isDebugVisible && (
        <View style={styles.debugPanel}>
          <View style={styles.debugHeader}>
            <Text style={styles.debugTitle}>TRANSCRIPT</Text>
            <View style={styles.voiceMeter}>
              {[0, 1, 2, 3, 4].map((i) => (
                <View
                  key={i}
                  style={[
                    styles.voiceBar,
                    { height: (i + 1) * 2 + 2 },
                  ]}
                />
              ))}
            </View>
          </View>
          <ScrollView style={styles.debugContent} contentContainerStyle={styles.debugContentContainer}>
            <Text style={styles.debugText}>
              Transcript text will appear here...
            </Text>
            
            {/* Action badges showcase */}
            <View style={styles.badgeRow}>
              <ActionBadge type="planning" size="small" />
              <ActionBadge type="research" size="small" />
              <ActionBadge type="coding" size="small" />
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  // Bottom Menu
  bottomMenu: {
    position: 'absolute',
    bottom: spacing.xl,
    left: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 20,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  menuButton: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  menuButtonText: {
    ...typography.label, // Brand kit: monospace uppercase labels
    color: colors.muted,
    fontSize: 10,
  },

  // Debug Panel
  debugPanel: {
    position: 'absolute',
    left: '10%',
    top: '30%',
    width: '35%',
    maxWidth: 250,
    height: 300,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 20,
  },
  debugHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  debugTitle: {
    ...typography.label,
    color: colors.text.primary,
    fontSize: 10,
  },
  voiceMeter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 1,
    height: 12,
  },
  voiceBar: {
    width: 2,
    backgroundColor: colors.action.alert, // Brand kit: alert red
    borderRadius: 1,
  },
  debugContent: {
    flex: 1,
  },
  debugContentContainer: {
    padding: spacing.md,
    gap: spacing.md,
  },
  debugText: {
    ...typography.mono,
    color: colors.text.secondary,
    fontSize: 11,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
});
