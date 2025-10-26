import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';

type Operation = '+' | '-' | '×' | '÷' | null;

const App_6: React.FC = () => {
  const [number1, setNumber1] = useState<string>('');
  const [number2, setNumber2] = useState<string>('');
  const [operation, setOperation] = useState<Operation>(null);

  const parsed1 = useMemo(() => parseFloat(number1.replace(',', '.')), [number1]);
  const parsed2 = useMemo(() => parseFloat(number2.replace(',', '.')), [number2]);

  const result: string = useMemo(() => {
    if (operation == null) {
      return '';
    }
    if (isNaN(parsed1) || isNaN(parsed2)) {
      return '';
    }
    let value: number;
    switch (operation) {
      case '+':
        value = parsed1 + parsed2;
        break;
      case '-':
        value = parsed1 - parsed2;
        break;
      case '×':
        value = parsed1 * parsed2;
        break;
      case '÷':
        if (parsed2 === 0) {
          return '∞';
        }
        value = parsed1 / parsed2;
        break;
      default:
        return '';
    }
    // Limit to reasonable precision for display
    const rounded = Math.round(value * 1e10) / 1e10;
    return String(rounded);
  }, [operation, parsed1, parsed2]);

  const onPressOperation = (op: Exclude<Operation, null>) => {
    setOperation(op);
  };

  const onClear = () => {
    setNumber1('');
    setNumber2('');
    setOperation(null);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Compute area (analog of LinearLayout row) */}
        <View style={styles.computeRow}>
          <TextInput
            testID="number1"
            style={[styles.edit, styles.editNumber]}
            value={number1}
            onChangeText={setNumber1}
            placeholder="0"
            keyboardType="numeric"
          />
          <Text testID="operation" style={styles.operation}>
            {operation ?? ''}
          </Text>
          <TextInput
            testID="number2"
            style={[styles.edit, styles.editNumber]}
            value={number2}
            onChangeText={setNumber2}
            placeholder="0"
            keyboardType="numeric"
          />
          <Text style={styles.equal}>=</Text>
          <Text testID="result" style={styles.result}>
            {result}
          </Text>
        </View>

        {/* Grid of buttons */}
        <View style={styles.grid}>
          {/* + spans 2 rows (imitated by a tall button) */}
          <TouchableOpacity
            style={[styles.button, styles.buttonTall]}
            onPress={() => onPressOperation('+')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressOperation('-')}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressOperation('÷')}>
            <Text style={styles.buttonText}>÷</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressOperation('×')}>
            <Text style={styles.buttonText}>×</Text>
          </TouchableOpacity>

          {/* C spans 3 columns */}
          <TouchableOpacity style={[styles.button, styles.buttonWide]} onPress={onClear}>
            <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  computeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: 345,
    marginBottom: 24,
  },
  edit: {
    backgroundColor: '#F5F5F5',
    color: '#212121',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  editNumber: {
    width: 90,
    textAlign: 'right',
  },
  operation: {
    width: 40,
    textAlign: 'center',
    fontSize: 30,
    color: '#424242',
  },
  equal: {
    width: 24,
    textAlign: 'center',
    fontSize: 20,
    color: '#616161',
  },
  result: {
    minWidth: 80,
    textAlign: 'right',
    fontSize: 20,
    color: '#000000',
  },
  grid: {
    alignSelf: 'center',
    width: 350,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: (350 - 16 * 2) / 3 - 4,
    height: 56,
    backgroundColor: '#2196F3',
    marginVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonTall: {
    height: 120,
  },
  buttonWide: {
    width: 350,
    backgroundColor: '#E53935',
  },
});

export default App_6;



