import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ImageBackground, Animated, Easing, Text } from 'react-native';

const AnalogClock = ({ theme }) => {
  const [time, setTime] = useState(new Date());
  
  // Refs for animated values of hour, minute, and second hands
  const secondAnim = useRef(new Animated.Value(0)).current;
  const minuteAnim = useRef(new Animated.Value(0)).current;
  const hourAnim = useRef(new Animated.Value(0)).current;

  let clockBackground = theme === 0 ? require('./assets/images/ana-clock1-bg.png') : require('./assets/images/ana-clock2-bg.png');

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
	
	return () => clearInterval(interval);
  }, [clockBackground]);

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


// Format time as HH:MM:SS
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Format date as Month Day, Year
  const formatDate = (date) => {
    return date.toDateString();
  };
  
  return (
    <View>
        <ImageBackground
        
		source={clockBackground}
        style={styles.clock}
        >
      {/*
      <ImageBackground
        source={require('./assets/images/ana-clock1-bg.png')}
        style={styles.clock}
      />*/}
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
      
      {/* Display the formatted date and time below the clock */}
      <View style={styles.timeContainer}>
        <Text style={styles.dateText}>{formatDate(time)}</Text>
        <Text style={styles.timeText}>{formatTime(time)}</Text>
      </View>
      
      
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
  
  timeContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  dateText: {
    color: '#fff',
    fontSize: 18,
  },
  timeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  
});

export default AnalogClock;
