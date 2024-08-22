import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';

const FlipClock = () => {
  const [time, setTime] = useState(new Date());
  const [flipAnim, setFlipAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }).start(() => {
        setTime(new Date());
        flipAnim.setValue(0);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [flipAnim]);

  const flipInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  const transformStyle = {
    transform: [{ rotateX: flipInterpolate }],
  };

  const formatTimeUnit = (unit) => (unit < 10 ? `0${unit}` : unit);

  return (
    <View style={styles.container}>
      <View style={styles.flipCard}>
        <Animated.View style={[styles.flipCardFront, transformStyle]}>
          <Text style={styles.flipText}>
            {formatTimeUnit(time.getHours())}:{formatTimeUnit(time.getMinutes())}:{formatTimeUnit(time.getSeconds())}
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  flipCard: {
    width: 200,
    height: 100,
    backgroundColor: '#333',
    borderRadius: 10,
    overflow: 'hidden',
  },
  flipCardFront: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  flipText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default FlipClock;
