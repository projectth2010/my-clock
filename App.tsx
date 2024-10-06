import React, { useState } from 'react';
import { SafeAreaView, Button, Modal, Text, View, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Correct import

import FlipClock from './FlipClock3';
import AnalogClock from './AnalogClock2';

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const [clockType, setClockType] = useState('FlipClock'); // Default clock type
  const [tickSpeed, setTickSpeed] = useState(1000); // Default tick speed in ms
  const [theme, setTheme] = useState('Dark'); // Default theme
  const [inputTickSpeed, setInputTickSpeed] = useState('1.0'); // Input for tick speed in seconds

  const updateTickSpeed = () => {
    const newTickSpeed = parseFloat(inputTickSpeed) * 1000; // Convert seconds to milliseconds
    if (!isNaN(newTickSpeed) && newTickSpeed >= 1000 && newTickSpeed <= 2000) {
      setTickSpeed(newTickSpeed);
      setIsModalVisible(false); // Close modal after setting the speed
    } else {
      alert('Please enter a valid number between 1.0 and 2.0 seconds.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Toggle between AnalogClock and FlipClock */}
      {clockType === 'FlipClock' ? (
        <FlipClock tickSpeed={tickSpeed} theme={theme} />
      ) : (
        <AnalogClock theme={theme} />
      )}

      {/* Button to open settings modal */}
      <Button title="Settings" onPress={() => setIsModalVisible(true)} />

      {/* Modal for settings */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Settings</Text>

            {/* Clock Type Selector */}
            <Text style={styles.label}>Select Clock Type</Text>
            <Picker
              selectedValue={clockType}
              style={styles.picker}
              onValueChange={(itemValue) => setClockType(itemValue)}
            >
              <Picker.Item label="Flip Clock" value="FlipClock" />
              <Picker.Item label="Analog Clock" value="AnalogClock" />
            </Picker>

            {/* Tick Speed Input */}
            <Text style={styles.label}>Set Tick Speed (1.0 - 2.0 seconds)</Text>
            <TextInput
              style={styles.input}
              value={inputTickSpeed}
              keyboardType="numeric"
              onChangeText={setInputTickSpeed}
              placeholder="Enter tick speed (1.0 - 2.0 seconds)"
            />
            <Button title="Apply Tick Speed" onPress={updateTickSpeed} />

            {/* Theme Selector */}
            <Text style={styles.label}>Select Theme</Text>
            <Picker
              selectedValue={theme}
              style={styles.picker}
              onValueChange={(itemValue) => setTheme(itemValue)}
            >
              <Picker.Item label="Dark" value="0" />
              <Picker.Item label="Light" value="1" />
            </Picker>

            {/* Close Modal Button */}
            <Button title="Close" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    width: 200,
    height: 50,
  },
});

export default App;
