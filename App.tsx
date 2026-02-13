/**
 * VONDR-Native - Main App
 * Phase 1: Skeleton structure with styling & navigation
 */

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, Platform } from 'react-native';

// Components
import MainCanvas from './src/components/MainCanvas';
import Header from './src/components/Header';
import CentralOrb from './src/components/CentralOrb';
import LeftMenuDrawer from './src/components/LeftMenuDrawer';
import RightDrawer from './src/components/RightDrawer';
import AgentSelectorDrawer from './src/components/AgentSelectorDrawer';
import FloatingMenus from './src/components/FloatingMenus';
import MenuItemPage from './src/components/MenuItemPage';

export default function App() {
  // Menu state
  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isAgentSelectorOpen, setIsAgentSelectorOpen] = useState(false);
  const [isBottomMenuOpen, setIsBottomMenuOpen] = useState(false);
  
  // Navigation state
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  
  // Agent state
  const [selectedAgent, setSelectedAgent] = useState<string>('XEO');
  const [pulseState, setPulseState] = useState<'idle' | 'processing' | 'active'>('idle');
  
  // Debug mode
  const [isDebugMode, setIsDebugMode] = useState(true);

  // Tap handlers
  const handleSingleTap = () => {
    // Only toggle if no other panels are open
    if (!isLeftMenuOpen && !isRightDrawerOpen && !isAgentSelectorOpen && !currentPage) {
      setIsBottomMenuOpen((prev) => !prev);
    }
  };

  const handleDoubleTap = () => {
    // Only open menu if no other overlay is active
    if (!isRightDrawerOpen && !isAgentSelectorOpen && !isBottomMenuOpen && !currentPage) {
      setIsLeftMenuOpen(true);
    }
  };

  // Menu item navigation
  const handleMenuItemPress = (item: string) => {
    setCurrentPage(item);
    setIsLeftMenuOpen(false);
  };

  // Close menu item page
  const handlePageClose = () => {
    setCurrentPage(null);
    setIsLeftMenuOpen(true);
  };

  // Orb interactions
  const handleOrbPullDown = () => {
    setIsAgentSelectorOpen(true);
  };

  const handleOrbPullLeft = () => {
    console.log('Orb: Cancel');
    // Could show toast or visual feedback
  };

  const handleOrbPullRight = () => {
    console.log('Orb: Send');
    // Could trigger send action
  };

  // Agent selection
  const handleSelectAgent = (agent: string) => {
    setSelectedAgent(agent);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <MainCanvas onSingleTap={handleSingleTap} onDoubleTap={handleDoubleTap}>
          {/* Header */}
          <Header selectedAgent={selectedAgent} pulseVariant={pulseState} />

          {/* Central Orb */}
          <CentralOrb
            onPullDown={handleOrbPullDown}
            onPullLeft={handleOrbPullLeft}
            onPullRight={handleOrbPullRight}
          />

          {/* Floating Menus */}
          <FloatingMenus
            isBottomMenuVisible={isBottomMenuOpen}
            isDebugVisible={isDebugMode && isBottomMenuOpen}
          />

          {/* Left Menu Drawer */}
          <LeftMenuDrawer
            isOpen={isLeftMenuOpen}
            onClose={() => setIsLeftMenuOpen(false)}
            onMenuItemPress={handleMenuItemPress}
          />

          {/* Right Drawer */}
          <RightDrawer isOpen={isRightDrawerOpen} onClose={() => setIsRightDrawerOpen(false)} />

          {/* Agent Selector Drawer */}
          <AgentSelectorDrawer
            isOpen={isAgentSelectorOpen}
            onClose={() => setIsAgentSelectorOpen(false)}
            selectedAgent={selectedAgent}
            onSelectAgent={handleSelectAgent}
          />

          {/* Menu Item Page */}
          <MenuItemPage
            isOpen={!!currentPage}
            title={currentPage || ''}
            onClose={handlePageClose}
          />
        </MainCanvas>

        <StatusBar style="light" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
