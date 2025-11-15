import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import { NavigationProps } from '../types/navigation.ts';
import {commonStyles} from '../../styles/commonStyles.ts';
import {colors} from '../../styles/colors.ts';

interface Props {
  navigation: NavigationProps;
}

const NormalScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Это обычная деятельность</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>НАЗАД</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.containerCentered,
    backgroundColor: colors.white,
  } as ViewStyle,
  text: {
    fontSize: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    ...commonStyles.buttonText,
  } as TextStyle,
});

export default NormalScreen;
