import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const LabeledInput: React.FC<{
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}> = ({label, value, onChangeText, placeholder, keyboardType}) => {
  return (
    <View style={styles.inputRow}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default LabeledInput;

const styles = StyleSheet.create({
  inputRow: {
    marginBottom: 12,
  },
  inputLabel: {
    marginBottom: 6,
    color: '#616161',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FAFAFA',
  },
});
