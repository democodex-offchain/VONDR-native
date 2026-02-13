/**
 * UIKitPanel - Sub-menu for UI Kit demos and component showcase
 * Displays interactive demos for notifications, permissions, and component pages
 * Slides in as right panel next to the main menu
 * Width: Dynamically fills remaining screen width after left menu
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
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

interface UIKitPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBrand?: () => void;
}

export default function UIKitPanel({ isOpen, onClose, onOpenBrand }: UIKitPanelProps) {
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

  // Page navigation handlers
  const handleBrandClick = () => {
    if (onOpenBrand) {
      onOpenBrand();
      onClose(); // Close the menu after opening the page
    }
  };

  const handleAgentStreamClick = () => {
    Alert.alert('Agent Stream', 'Agent Stream page coming soon');
  };

  const handleUnusedItemsClick = () => {
    Alert.alert('Unused Items', 'Unused Items page coming soon');
  };

  const handleAnimatedIconClick = () => {
    Alert.alert('Animated Icon', 'Animated Icon page coming soon');
  };

  // Toast notification handlers
  const handleSuccessToast = () => {
    Alert.alert('Success Toast', 'Success notification triggered');
  };

  const handleCancelToast = () => {
    Alert.alert('Cancel Toast', 'Cancelled notification triggered');
  };

  const handleInfoToast = () => {
    Alert.alert('Info Toast', 'Info notification triggered');
  };

  // Push notification handlers
  const handleSimplePush = () => {
    Alert.alert('Push Notification', 'Simple push notification');
  };

  const handleTitledPush = () => {
    Alert.alert('Push with Title', 'Push notification with title');
  };

  const handleActionPush = () => {
    Alert.alert('Push with Action', 'Push notification with action button');
  };

  const handleAlertPush = () => {
    Alert.alert('Alert Push', 'Alert style push notification');
  };

  const handleSuccessPush = () => {
    Alert.alert('Success Push', 'Success style push notification');
  };

  // Permission request handlers
  const handleMicrophoneRequest = () => {
    Alert.alert('Microphone Permission', 'Requesting microphone access');
  };

  const handleCameraRequest = () => {
    Alert.alert('Camera Permission', 'Requesting camera access');
  };

  const handlePhotosRequest = () => {
    Alert.alert('Photos Permission', 'Requesting photos access');
  };

  if (!shouldRender) return null;

  return (
    <Animated.View style={[styles.panel, panelStyle]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>UI KIT</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
      {/* Pages Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PAGES</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={handleBrandClick}>
            <Text style={styles.buttonText}>BRAND</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleAgentStreamClick}>
            <Text style={styles.buttonText}>AGENT STREAM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleUnusedItemsClick}>
            <Text style={styles.buttonText}>UNUSED ITEMS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleAnimatedIconClick}>
            <Text style={styles.buttonText}>ANIMATED ICON</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Toast Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TOAST NOTIFICATIONS</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={handleSuccessToast}>
            <Text style={styles.buttonText}>SUCCESS TOAST</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCancelToast}>
            <Text style={styles.buttonText}>CANCEL TOAST</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleInfoToast}>
            <Text style={styles.buttonText}>INFO TOAST</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Push Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PUSH NOTIFICATIONS</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={handleSimplePush}>
            <Text style={styles.buttonText}>SIMPLE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTitledPush}>
            <Text style={styles.buttonText}>WITH TITLE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleActionPush}>
            <Text style={styles.buttonText}>WITH ACTION</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleAlertPush}>
            <Text style={styles.buttonText}>ALERT STYLE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSuccessPush}>
            <Text style={styles.buttonText}>SUCCESS STYLE</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Permission Requests Section */}
      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.sectionTitle}>PERMISSION REQUESTS</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={handleMicrophoneRequest}>
            <Text style={styles.buttonText}>REQUEST MICROPHONE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCameraRequest}>
            <Text style={styles.buttonText}>REQUEST CAMERA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePhotosRequest}>
            <Text style={styles.buttonText}>REQUEST PHOTOS</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: DRAWER_WIDTH,
    width: PANEL_WIDTH,
    backgroundColor: 'rgba(24, 24, 27, 0.95)', // zinc-900 with 95% opacity
    backdropFilter: 'blur(20px)',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 50,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
    paddingBottom: spacing.lg,
  },
  headerTitle: {
    fontFamily: 'Courier New',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    color: colors.text.secondary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.sm,
    paddingBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
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
  buttonGroup: {
    gap: spacing.xs,
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 6,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.sm,
  },
  buttonText: {
    fontFamily: 'Courier New',
    fontSize: 12,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: colors.text.secondary,
    textAlign: 'left',
  },
});
