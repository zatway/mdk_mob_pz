import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ViewStyle,
} from 'react-native';
import {commonStyles} from '../styles/commonStyles.ts';
import {colors} from '../styles/colors.ts';

type ButtonColors = {
  red: string;
  yellow: string;
  green: string;
};

type ColorName = 'Красный' | 'Жёлтый' | 'Зелёный';

const red = '#FF0000';
const yellow = '#FFFF00';
const green = '#00FF00';
const white = '#FFFFFF';

const App_3: React.FC = () => {
  const [backgroundColor, setBackgroundColor] = useState<string>(red);
  const [buttonColors, setButtonColors] = useState<ButtonColors>({
    red,
    yellow,
    green,
  });

  const [currentColor, setCurrentColor] = useState<ColorName>('Красный');
  const handleColorChange = (color: string, colorName: ColorName): void => {
    setBackgroundColor(color);
    setCurrentColor(colorName);
    setButtonColors({
      red: color === red ? red : white,
      yellow: color === yellow ? yellow : white,
      green: color === green ? green : white,
    });
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: buttonColors.red}]}
          onPress={() => handleColorChange(red, 'Красный')}>
          <Text style={styles.buttonText}>Красный</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: buttonColors.yellow}]}
          onPress={() => handleColorChange(yellow, 'Жёлтый')}>
          <Text style={styles.buttonText}>Жёлтый</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: buttonColors.green}]}
          onPress={() => handleColorChange(green, 'Зелёный')}>
          <Text style={styles.buttonText}>Зелёный</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.infoText}>{currentColor}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.containerCentered,
  } as ViewStyle,
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.black,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  infoText: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
  },
});

export default App_3;
