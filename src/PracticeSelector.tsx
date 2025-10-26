import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import App_1 from './PZ_1/App_1';
import App_2 from './PZ_2/App_2';
import App_3 from './PZ_3/App_3.tsx';
import App_4 from './PZ_4/App_4.tsx';
import App_5 from './PZ_5/App_5.tsx';
import App_6 from './PZ_6/App_6';
import App_7 from './PZ_7/App_7';
import App_8 from './PZ_8/App_8';
import App_9 from './PZ_9/App_9';
import App_10 from './PZ_10/App_10';
import App_12 from './PZ_12/App_12';
import App_11 from './PZ_11/App_11';
import App_13 from './PZ_13/App_13';
import App_14 from './PZ_14/App_14.tsx';
import App_15 from './PZ_15/App_15.tsx';
import App_16 from './PZ_16/App_16.tsx';
import App_17 from './PZ_17/App_17.tsx';

const PracticeWrapper = ({
  children,
  onBack,
}: {
  children: React.ReactNode;
  onBack: () => void;
}) => (
  <View style={{flex: 1}}>
    <View style={{flex: 1, paddingVertical: 25}}>{children}</View>
    <TouchableOpacity style={styles.backButton} onPress={onBack}>
      <Text style={styles.backButtonText}>Назад к выбору</Text>
    </TouchableOpacity>
  </View>
);

const PracticeSelector = () => {
  const [selected, setSelected] = useState<null | number>(null);

  if (selected === 1)
    return (
      <PracticeWrapper onBack={() => setSelected(null)}>
        <App_1 />
      </PracticeWrapper>
    );
  if (selected === 2)
    return (
      <PracticeWrapper onBack={() => setSelected(null)}>
        <App_2 />
      </PracticeWrapper>
    );
  if (selected === 3)
    return (
      <PracticeWrapper onBack={() => setSelected(null)}>
        <App_3 />
      </PracticeWrapper>
    );
  if (selected === 4)
    return (
      <PracticeWrapper onBack={() => setSelected(null)}>
        <App_4 />
      </PracticeWrapper>
    );
  if (selected === 5)
    return (
      <PracticeWrapper onBack={() => setSelected(null)}>
        <App_5 />
      </PracticeWrapper>
    );
  if (selected === 6)
    return (
      <PracticeWrapper onBack={() => setSelected(null)}>
        <App_6 />
      </PracticeWrapper>
    );
  if (selected === 7)
    return (
      <PracticeWrapper onBack={() => setSelected(null)}>
        <App_7 />
      </PracticeWrapper>
    );
  if (selected === 8)
    return (
      <PracticeWrapper onBack={() => setSelected(null)}>
        <App_8 />
      </PracticeWrapper>
    );
  if (selected === 9)
    return (
      <PracticeWrapper onBack={() => setSelected(null)}>
        <App_9 />
      </PracticeWrapper>
    );
  if (selected === 10)
    return (
      <PracticeWrapper onBack={() => setSelected(null)}>
        <App_10 />
      </PracticeWrapper>
    );
  if (selected === 11)
    return (
      <PracticeWrapper onBack={() => setSelected(null)}>
        <App_11 />
      </PracticeWrapper>
    );
  if (selected === 12)
    return (
      <PracticeWrapper onBack={() => setSelected(null)}>
        <App_12 />
      </PracticeWrapper>
    );
  if (selected === 13)
    return (
      <PracticeWrapper onBack={() => setSelected(null)}>
        <App_13 />
      </PracticeWrapper>
    );
  if (selected === 14)
    return (
      <PracticeWrapper onBack={() => setSelected(null)}>
        <App_14 />
      </PracticeWrapper>
    );
  if (selected === 14)
    return (
      <PracticeWrapper onBack={() => setSelected(null)}>
        <App_15 />
      </PracticeWrapper>
    );
  if (selected === 15)
    return (
      <PracticeWrapper onBack={() => setSelected(null)}>
        <App_15 />
      </PracticeWrapper>
    );
  if (selected === 16)
    return (
      <PracticeWrapper onBack={() => setSelected(null)}>
        <App_16 />
      </PracticeWrapper>
    );
  if (selected === 17)
    return (
      <PracticeWrapper onBack={() => setSelected(null)}>
        <App_17 />
      </PracticeWrapper>
    );

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={true}>
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
      <TouchableOpacity style={styles.button} onPress={() => setSelected(5)}>
        <Text style={styles.buttonText}>5 практика</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSelected(6)}>
        <Text style={styles.buttonText}>6 практика</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSelected(7)}>
        <Text style={styles.buttonText}>7 практика</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSelected(8)}>
        <Text style={styles.buttonText}>8 практика</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSelected(9)}>
        <Text style={styles.buttonText}>9 практика</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSelected(10)}>
        <Text style={styles.buttonText}>10 практика</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSelected(11)}>
        <Text style={styles.buttonText}>11 практика</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSelected(12)}>
        <Text style={styles.buttonText}>12 практика</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSelected(13)}>
        <Text style={styles.buttonText}>13 практика</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSelected(14)}>
        <Text style={styles.buttonText}>14 практика</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSelected(15)}>
        <Text style={styles.buttonText}>15 практика</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSelected(16)}>
        <Text style={styles.buttonText}>16 практика</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSelected(17)}>
        <Text style={styles.buttonText}>17 практика</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingVertical: 20,
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
