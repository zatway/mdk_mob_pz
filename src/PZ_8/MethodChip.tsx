import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../styles/colors.ts';

const MethodChip: React.FC<{label: string; selected: boolean; onPress: () => void}> = ({label, selected, onPress}) => {
  return (
    <TouchableOpacity style={[styles.chip, selected && styles.chipSelected]} onPress={onPress}>
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default MethodChip;

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: colors.greyLight,
  },
  chipSelected: {
    backgroundColor: colors.primaryLighter,
  },
  chipText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: colors.primaryDark,
  },
})
