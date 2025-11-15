import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../styles/colors.ts';

const ControlButton: React.FC<{label: string; onPress: () => void; disabled?: boolean}> = ({label, onPress, disabled}) => (
  <TouchableOpacity style={[styles.btn, disabled && styles.btnDisabled]} onPress={onPress} disabled={disabled}>
    <Text style={styles.btnText}>{label}</Text>
  </TouchableOpacity>
);

export default ControlButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.info,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginRight: 8,
  },
  btnDisabled: {
    backgroundColor: colors.infoLight,
  },
  btnText: {
    color: colors.white,
    fontWeight: '700',
  },
})
