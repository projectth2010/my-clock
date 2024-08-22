import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {Easing} from 'react-native-reanimated';

const AnalogClock = () => {
  const [hours1, setHours1] = useState(new Date().getHours());
  const [minutes1, setMinutes1] = useState(new Date().getMinutes());
  const [seconds1, setSeconds1] = useState(new Date().getSeconds());
  const [hours2, setHours2] = useState(new Date().getHours());
  const [minutes2, setMinutes2] = useState(new Date().getMinutes());
  const [seconds2, setSeconds2] = useState(new Date().getSeconds());

  const [hourFlipAnim1] = useState(new Animated.Value(0));
  const [minuteFlipAnim1] = useState(new Animated.Value(0));
  const [secondFlipAnim1] = useState(new Animated.Value(0));

  const [hourFlipAnim2] = useState(new Animated.Value(0));
  const [minuteFlipAnim2] = useState(new Animated.Value(0));
  const [secondFlipAnim2] = useState(new Animated.Value(0));

  // Clock 1: Normal time
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const currentHours = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();
      const currentSeconds = currentTime.getSeconds();

      if (currentSeconds !== seconds1) {
        triggerFlipAnimation(secondFlipAnim1, () =>
          setSeconds1(currentSeconds),
        );
      }

      if (currentMinutes !== minutes1) {
        triggerFlipAnimation(minuteFlipAnim1, () =>
          setMinutes1(currentMinutes),
        );
      }

      if (currentHours !== hours1) {
        triggerFlipAnimation(hourFlipAnim1, () => setHours1(currentHours));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds1, minutes1, hours1]);

  // Clock 2: Delay by 2 seconds to update 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date(new Date().getTime() + 1000); // Adding 1 second manually
      const currentHours = newTime.getHours();
      const currentMinutes = newTime.getMinutes();
      const currentSeconds = newTime.getSeconds();

      if (currentSeconds !== seconds2) {
        triggerFlipAnimation(secondFlipAnim2, () =>
          setSeconds2(currentSeconds),
        );
      }

      if (currentMinutes !== minutes2) {
        triggerFlipAnimation(minuteFlipAnim2, () =>
          setMinutes2(currentMinutes),
        );
      }

      if (currentHours !== hours2) {
        triggerFlipAnimation(hourFlipAnim2, () => setHours2(currentHours));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [seconds2, minutes2, hours2]);

  const triggerFlipAnimation = (anim, callback) => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start(() => {
      callback();
      anim.setValue(0);
    });
  };

  const flipInterpolate = anim => {
    return anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-180deg'],
    });
  };

  const formatTimeUnit = unit => (unit < 10 ? `0${unit}` : unit);

  return (
    <View style={styles.container}>
      {/* Clock 1 */}
      <View style={styles.clockContainer}>
        <Text style={styles.clockLabel}>Clock 1 (Normal Time)</Text>
        <View style={styles.flipCardContainer}>
          <View style={styles.flipCard}>
            <Animated.View
              style={[
                styles.flipCardFront,
                {transform: [{rotateX: flipInterpolate(hourFlipAnim1)}]},
              ]}>
              <Text style={styles.flipText}>{formatTimeUnit(hours1)}</Text>
            </Animated.View>
          </View>
          <Text style={styles.separator}>:</Text>
          <View style={styles.flipCard}>
            <Animated.View
              style={[
                styles.flipCardFront,
                {transform: [{rotateX: flipInterpolate(minuteFlipAnim1)}]},
              ]}>
              <Text style={styles.flipText}>{formatTimeUnit(minutes1)}</Text>
            </Animated.View>
          </View>
          <Text style={styles.separator}>:</Text>
          <View style={styles.flipCard}>
            <Animated.View
              style={[
                styles.flipCardFront,
                {transform: [{rotateX: flipInterpolate(secondFlipAnim1)}]},
              ]}>
              <Text style={styles.flipText}>{formatTimeUnit(seconds1)}</Text>
            </Animated.View>
          </View>
        </View>
      </View>

      {/* Clock 2 */}
      <View style={styles.clockContainer}>
        <Text style={styles.clockLabel}>Clock 2 (Delayed by 2 sec)</Text>
        <View style={styles.flipCardContainer}>
          <View style={styles.flipCard}>
            <Animated.View
              style={[
                styles.flipCardFront,
                {transform: [{rotateX: flipInterpolate(hourFlipAnim2)}]},
              ]}>
              <Text style={styles.flipText}>{formatTimeUnit(hours2)}</Text>
            </Animated.View>
          </View>
          <Text style={styles.separator}>:</Text>
          <View style={styles.flipCard}>
            <Animated.View
              style={[
                styles.flipCardFront,
                {transform: [{rotateX: flipInterpolate(minuteFlipAnim2)}]},
              ]}>
              <Text style={styles.flipText}>{formatTimeUnit(minutes2)}</Text>
            </Animated.View>
          </View>
          <Text style={styles.separator}>:</Text>
          <View style={styles.flipCard}>
            <Animated.View
              style={[
                styles.flipCardFront,
                {transform: [{rotateX: flipInterpolate(secondFlipAnim2)}]},
              ]}>
              <Text style={styles.flipText}>{formatTimeUnit(seconds2)}</Text>
            </Animated.View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  clockContainer: {
    alignItems: 'center',
  },
  clockLabel: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  flipCardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipCard: {
    width: 80,
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
  separator: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

export default AnalogClock;
