/**
 * Button - Reusable button component with brand kit styling
 * Supports all button variants from the brand kit
 */

import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { buttonStyles } from '../theme';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'toggle' | 'send';
  onPress?: () => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  active?: boolean; // For toggle button
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  variant = 'primary',
  onPress,
  children,
  icon,
  disabled = false,
  active = false,
  style,
  textStyle,
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const scale = useSharedValue(1);

  const buttonStyle = buttonStyles[variant];

  // Animated scale for press feedback
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    setIsPressed(true);
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    setIsPressed(false);
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  // Determine container style based on state
  let containerStyle = [buttonStyle.container, style];
  let textStyleFinal = [buttonStyle.text, textStyle];

  if (variant === 'toggle' && active) {
    containerStyle.push(buttonStyle.active);
  }

  if (isPressed && buttonStyle.pressed) {
    containerStyle.push(buttonStyle.pressed);
    if (buttonStyle.pressed.color) {
      textStyleFinal.push({ color: buttonStyle.pressed.color });
    }
  }

  if (disabled && variant === 'send' && buttonStyle.disabled) {
    containerStyle.push(buttonStyle.disabled);
  }

  return (
    <AnimatedTouchable
      style={[containerStyle, animatedStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {icon || (children && <Text style={textStyleFinal}>{children}</Text>)}
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  // Placeholder for any custom styles
});
