/**
 * BrandPage - Full-screen brand guide page
 * Shows VONDR identity, color palettes, and design system
 * Includes back button header (not in PWA version)
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { colors, typography, spacing } from '../theme';

interface BrandPageProps {
  onClose: () => void;
}

// Functional Palette Colors
const FUNCTIONAL_COLORS = [
  { name: 'Planning', color: '#c084fc' },
  { name: 'Analyzing', color: '#818cf8' },
  { name: 'Research', color: '#60a5fa' },
  { name: 'Docs', color: '#38bdf8' },
  { name: 'Coding', color: '#a78bfa' },
  { name: 'Generating', color: '#e879f9' },
  { name: 'Action', color: '#fbbf24' },
  { name: 'System', color: '#34d399' },
  { name: 'Alert', color: '#f87171' },
  { name: 'File Ops', color: '#94a3b8' },
];

// Orb Spectrum Colors
const ORB_COLORS = [
  { name: 'Pulse', color: '#ec4899' },
  { name: 'Synth', color: '#d946ef' },
  { name: 'Void', color: '#a855f7' },
  { name: 'Deep', color: '#6366f1' },
  { name: 'Core', color: '#3b82f6' },
  { name: 'Aether', color: '#0ea5e9' },
  { name: 'Data', color: '#06b6d4' },
  { name: 'Stream', color: '#14b8a6' },
  { name: 'Life', color: '#22c55e' },
  { name: 'Energy', color: '#eab308' },
];

// UI Colors
const UI_COLORS = [
  { name: 'Background', color: '#09090b', label: 'zinc-950' },
  { name: 'Surface', color: '#18181b', label: 'zinc-900' },
  { name: 'Foreground', color: '#ffffff', label: 'white' },
  { name: 'Muted', color: '#71717a', label: 'zinc-500' },
];

export default function BrandPage({ onClose }: BrandPageProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <ArrowLeft size={20} color={colors.text.secondary} />
        </TouchableOpacity>
        <Text style={styles.title}>BRAND</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
      >
        {/* Identity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IDENTITY</Text>
          <View style={styles.identityCard}>
            <View style={styles.wordmarkContainer}>
              <Text style={styles.wordmark}>VONDR</Text>
              <Text style={styles.wordmarkLabel}>THE WORDMARK</Text>
            </View>

            <View style={styles.storyContainer}>
              <Text style={styles.storyText}>
                1. Vǫndr (noun) is an Old Norse word meaning "rod" or "stick," which is the ancestor of the modern English word wand, referring to a slender stick, a scepter, or a staff with special power.
              </Text>
              <Text style={styles.storyText}>
                2. The word is also associated with "to wander or travel," suggesting an itinerant ancestor.
              </Text>
            </View>
          </View>
        </View>

        {/* Functional Palette Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FUNCTIONAL PALETTE</Text>
          <View style={styles.colorGrid}>
            {FUNCTIONAL_COLORS.map((item) => (
              <View key={item.name} style={styles.colorItem}>
                <View style={[styles.colorSwatch, { backgroundColor: item.color }]} />
                <Text style={styles.colorName}>{item.name}</Text>
                <Text style={styles.colorHex}>{item.color}</Text>
              </View>
            ))}
          </View>
          
          {/* Action Spectrum Gradient */}
          <View style={styles.gradientCard}>
            <View style={styles.gradientBar}>
              {/* Simulate gradient with multiple colored boxes */}
              <View style={[styles.gradientSegment, { backgroundColor: '#c084fc' }]} />
              <View style={[styles.gradientSegment, { backgroundColor: '#60a5fa' }]} />
              <View style={[styles.gradientSegment, { backgroundColor: '#a78bfa' }]} />
              <View style={[styles.gradientSegment, { backgroundColor: '#fbbf24' }]} />
              <View style={[styles.gradientSegment, { backgroundColor: '#f87171' }]} />
            </View>
            <Text style={styles.gradientLabel}>ACTION SPECTRUM</Text>
          </View>
        </View>

        {/* Orb Spectrum Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ORB SPECTRUM</Text>
          <View style={styles.colorGrid}>
            {ORB_COLORS.map((item) => (
              <View key={item.name} style={styles.colorItem}>
                <View style={[styles.colorSwatch, { backgroundColor: item.color }]} />
                <Text style={styles.colorName}>{item.name}</Text>
                <Text style={styles.colorHex}>{item.color}</Text>
              </View>
            ))}
          </View>
          
          {/* Orb Gradient Locus */}
          <View style={styles.gradientCard}>
            <View style={styles.gradientBar}>
              {/* Simulate gradient with multiple colored boxes */}
              <View style={[styles.gradientSegment, { backgroundColor: '#ec4899' }]} />
              <View style={[styles.gradientSegment, { backgroundColor: '#6366f1' }]} />
              <View style={[styles.gradientSegment, { backgroundColor: '#06b6d4' }]} />
              <View style={[styles.gradientSegment, { backgroundColor: '#eab308' }]} />
            </View>
            <Text style={styles.gradientLabel}>ORB GRADIENT LOCUS</Text>
          </View>
        </View>

        {/* UI Colors Section */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>UI COLORS</Text>
          <View style={styles.uiColorGrid}>
            {UI_COLORS.map((item) => (
              <View key={item.name} style={styles.uiColorItem}>
                <View style={[styles.uiColorSwatch, { backgroundColor: item.color }]} />
                <Text style={styles.colorName}>{item.name}</Text>
                <Text style={styles.colorHex}>{item.label} ({item.color})</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background,
    zIndex: 100, // Above all menus and panels
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    backgroundColor: 'rgba(24, 24, 27, 0.5)', // zinc-900 with 50% opacity
  },
  backButton: {
    padding: spacing.sm,
    marginRight: spacing.md,
  },
  title: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '300',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl * 2,
    flexGrow: 1,
  },
  section: {
    marginBottom: spacing.xl * 2,
  },
  lastSection: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '300',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: spacing.lg,
  },
  
  // Identity Section
  identityCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: spacing.xl,
  },
  wordmarkContainer: {
    marginBottom: spacing.xl,
  },
  wordmark: {
    fontFamily: 'System',
    fontSize: 60,
    fontWeight: '300',
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: 'rgba(255, 255, 255, 1)',
    marginBottom: spacing.xs,
  },
  wordmarkLabel: {
    fontFamily: 'Courier New',
    fontSize: 10,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: colors.text.secondary,
  },
  storyContainer: {
    borderLeftWidth: 2,
    borderLeftColor: 'rgba(255, 255, 255, 0.1)',
    paddingLeft: spacing.lg,
    gap: spacing.md,
  },
  storyText: {
    fontFamily: 'System',
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
    color: colors.text.secondary,
  },
  
  // Color Grid
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  colorItem: {
    width: '47%',
    gap: spacing.xs,
  },
  colorSwatch: {
    height: 96,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  colorName: {
    fontFamily: 'Courier New',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    color: 'rgba(255, 255, 255, 1)',
  },
  colorHex: {
    fontFamily: 'Courier New',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  
  // Gradient Card
  gradientCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: spacing.md,
    gap: spacing.sm,
  },
  gradientBar: {
    height: 32,
    borderRadius: 4,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  gradientSegment: {
    flex: 1,
  },
  gradientLabel: {
    fontFamily: 'Courier New',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  
  // UI Colors
  uiColorGrid: {
    gap: spacing.md,
  },
  uiColorItem: {
    gap: spacing.xs,
  },
  uiColorSwatch: {
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});
