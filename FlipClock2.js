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
    backgroundColor: '#1a1a1a',
  },
  flipCard: {
    width: 220,
    height: 120,
    backgroundColor: '#333',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  flipCardFront: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    backgroundColor: '#444',
    borderRadius: 15,
    padding: 10,
  },
  flipText: {
    color: '#ffffff',
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Courier',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});

export default FlipClock;
