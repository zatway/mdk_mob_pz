import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import { NavigationProps } from '../types/navigation.ts';
import {commonStyles} from '../../styles/commonStyles.ts';
import {colors} from '../../styles/colors.ts';

interface Props {
  navigation: NavigationProps;
}

const MainScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Главная страница</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Normal')}>
        <Text style={styles.buttonText}>ЗАПУСК ОБЫЧНОЙ ДЕЯТЕЛЬНОСТИ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dialog')}>
        <Text style={styles.buttonText}>ЗАПУСК ДИАЛОГОВОЙ ДЕЯТЕЛЬНОСТИ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.containerCentered,
    backgroundColor: colors.white,
  } as ViewStyle,
  title: {
    fontSize: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginVertical: 8,
    minWidth: 280,
    alignItems: 'center',
  },
  buttonText: {
    ...commonStyles.buttonText,
  } as TextStyle,
});

export default MainScreen;
