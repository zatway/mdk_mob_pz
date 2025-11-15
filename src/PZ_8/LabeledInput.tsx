import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {commonStyles} from '../styles/commonStyles.ts';
import {colors} from '../styles/colors.ts';

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
    color: colors.textTertiary,
    fontWeight: '600',
  },
  input: {
    ...commonStyles.input,
  },
});
