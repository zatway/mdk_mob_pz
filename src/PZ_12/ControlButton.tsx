import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const ControlButton: React.FC<{label: string; onPress: () => void; disabled?: boolean}> = ({label, onPress, disabled}) => (
  <TouchableOpacity style={[styles.btn, disabled && styles.btnDisabled]} onPress={onPress} disabled={disabled}>
    <Text style={styles.btnText}>{label}</Text>
  </TouchableOpacity>
);

export default ControlButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginRight: 8,
  },
  btnDisabled: {
    backgroundColor: '#90CAF9',
  },
  btnText: {
    color: '#ffffff',
    fontWeight: '700',
  },
})
