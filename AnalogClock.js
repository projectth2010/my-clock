import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ImageBackground, Animated, Easing } from 'react-native';

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());
  
  // Refs for animated values of hour, minute, and second hands
  const secondAnim = useRef(new Animated.Value(0)).current;
  const minuteAnim = useRef(new Animated.Value(0)).current;
  const hourAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // Animate second hand
    Animated.timing(secondAnim, {
      toValue: seconds * 6,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();

    // Animate minute hand
    Animated.timing(minuteAnim, {
      toValue: minutes * 6 + seconds / 10,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();

    // Animate hour hand
    Animated.timing(hourAnim, {
      toValue: (hours % 12) * 30 + minutes / 2,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }, [time]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'http://junesiphone.com/images/clock.png' }}
        style={styles.clock}
      >
        {/* Second hand */}
        <Animated.View
          style={[
            styles.secondHand,
            {
              transform: [
                {
                  rotate: secondAnim.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        />
        {/* Minute hand */}
        <Animated.View
          style={[
            styles.minuteHand,
            {
              transform: [
                {
                  rotate: minuteAnim.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        />
        {/* Hour hand */}
        <Animated.View
          style={[
            styles.hourHand,
            {
              transform: [
                {
                  rotate: hourAnim.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        />
        <View style={styles.centerCircle} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#393939',
  },
  clock: {
    width: 256,
    height: 256,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondHand: {
    position: 'absolute',
    width: 2,
    height: 100,
    backgroundColor: 'red',
    top: 24,
    left: 128, // Center the hand
    transformOrigin: 'bottom',
  },
  minuteHand: {
    position: 'absolute',
    width: 4,
    height: 80,
    backgroundColor: 'black',
    top: 46.5,
    left: 128.5, // Center the hand
    transformOrigin: 'bottom',
  },
  hourHand: {
    position: 'absolute',
    width: 6,
    height: 60,
    backgroundColor: 'black',
    top: 65.5,
    left: 125, // Center the hand
    transformOrigin: 'bottom',
  },
  centerCircle: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: 'black',
    borderRadius: 5,
  },
});

export default AnalogClock;
