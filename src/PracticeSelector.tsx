import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import App_1 from './PZ_1/App_1';
import App_2 from './PZ_2/App_2';
import App_3 from "./PZ_3/App_3.tsx";
import App_4 from "./PZ_4/App_4.tsx";

const PracticeWrapper = ({ children, onBack }: { children: React.ReactNode, onBack: () => void }) => (
  <View style={{ flex: 1 }}>
    <TouchableOpacity style={styles.backButton} onPress={onBack}>
      <Text style={styles.backButtonText}>Назад к выбору</Text>
    </TouchableOpacity>
    <View style={{ flex: 1 }}>{children}</View>
  </View>
);

const PracticeSelector = () => {
  const [selected, setSelected] = useState<null | number>(null);

  if (selected === 1) return <PracticeWrapper onBack={() => setSelected(null)}><App_1 /></PracticeWrapper>;
  if (selected === 2) return <PracticeWrapper onBack={() => setSelected(null)}><App_2 /></PracticeWrapper>;
  if (selected === 3) return <PracticeWrapper onBack={() => setSelected(null)}><App_3 /></PracticeWrapper>;
  if (selected === 4) return <PracticeWrapper onBack={() => setSelected(null)}><App_4 /></PracticeWrapper>;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setSelected(1)}>
        <Text style={styles.buttonText}>1 практика</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSelected(2)}>
        <Text style={styles.buttonText}>2 практика</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSelected(3)}>
        <Text style={styles.buttonText}>3 практика</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSelected(4)}>
        <Text style={styles.buttonText}>4 практика</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 6,
    marginVertical: 12,
    minWidth: 220,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PracticeSelector;
