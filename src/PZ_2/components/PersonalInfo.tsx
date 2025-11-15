import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {colors} from '../../styles/colors.ts';

const PersonalInfo = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Имя: Арсланбеков Радмир</Text>
            <Text style={styles.text}>Возраст: 18 лет</Text>
            <Text style={styles.text}>Специализация: Разработка ПО</Text>
            <Text style={styles.text}>Город: Оренбург</Text>
            <Text style={styles.text}>Опыт работы: 1 год</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    padding: 8,
    backgroundColor: colors.lightGrey,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    marginVertical: 4,
    color: colors.textDark,
  },
});

export default PersonalInfo;
