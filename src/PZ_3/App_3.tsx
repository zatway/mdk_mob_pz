import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, SafeAreaView} from 'react-native';

type ButtonColors = {
    red: string;
    yellow: string;
    green: string;
};
type ColorName = 'Красный' | 'Жёлтый' | 'Зелёный';

const App_3: React.FC = () => {
    const [backgroundColor, setBackgroundColor] = useState<string>('#FF0000');
    const [buttonColors, setButtonColors] = useState<ButtonColors>({
        red: '#FF0000',
        yellow: '#FFFF00',
        green: '#00FF00',
    });

    const [currentColor, setCurrentColor] = useState<ColorName>('Красный');
    const handleColorChange = (color: string, colorName: ColorName): void => {
        setBackgroundColor(color);
        setCurrentColor(colorName);
        setButtonColors({
            red: color === '#FF0000' ? '#FF0000' : '#FFFFFF',
            yellow: color === '#FFFF00' ? '#FFFF00' : '#FFFFFF',
            green: color === '#00FF00' ? '#00FF00' : '#FFFFFF',
        });
    };

    return (
        <SafeAreaView style={[styles.container, {backgroundColor}]}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: buttonColors.red}]}
                    onPress={() => handleColorChange('#FF0000', 'Красный')}
                >
                    <Text style={styles.buttonText}>Красный</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: buttonColors.yellow}]}
                    onPress={() => handleColorChange('#FFFF00', 'Жёлтый')}
                >
                    <Text style={styles.buttonText}>Жёлтый</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: buttonColors.green}]}
                    onPress={() => handleColorChange('#00FF00', 'Зелёный')}
                >
                    <Text style={styles.buttonText}>Зелёный</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.infoText}>{currentColor}</Text>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
        borderColor: '#000',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    infoText: {
        marginTop: 30,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default App_3;
