import React, { useEffect, useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  NewEasing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components';
import { position } from '@rainbow-me/styles';

const timingConfig = {
  duration: 2500,
  easing: NewEasing.bezier(0.76, 0, 0.24, 1),
};

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const ColorGradient = styled(AnimatedLinearGradient).attrs({
  end: { x: 0, y: 0.5 },
  start: { x: 1, y: 0.5 },
})`
  ${position.cover};
`;

export default function ShimmerAnimation({ color, enabled = true, width = 0 }) {
  const opacity = useSharedValue(1);
  const positionX = useSharedValue(-width * 1.5);
  const { colors } = useTheme();

  const gradientColors = useMemo(
    () => [
      colors.alpha(color, 0),
      colors.alpha(colors.white, 0.2),
      colors.alpha(color, 0),
    ],
    [color, colors]
  );

  useEffect(() => {
    if (enabled) {
      opacity.value = withTiming(1, timingConfig);
      positionX.value = withRepeat(withTiming(width * 1.5, timingConfig), -1);
    } else {
      opacity.value = withTiming(0, timingConfig);
      positionX.value = -width * 1.5;
    }
  }, [enabled, opacity, positionX, width]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: positionX.value }],
  }));

  return <ColorGradient colors={gradientColors} style={animatedStyle} />;
}
