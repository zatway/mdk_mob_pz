import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProps } from '../types/navigation.ts';

interface Props {
  navigation: NavigationProps;
}

const MainScreen: React.FC<Props> = ({ navigation }) => {
  console.log('MainScreen: render');

  React.useEffect(() => {
    console.log('MainScreen: componentDidMount');
    return () => {
      console.log('MainScreen: componentWillUnmount');
    };
  }, []);

  React.useEffect(() => {
    console.log('MainScreen: componentDidUpdate');
  });

  const handleNormalPress = () => {
    console.log('MainScreen: Navigating to NormalScreen');
    navigation.navigate('Normal');
  };

  const handleDialogPress = () => {
    console.log('MainScreen: Navigating to DialogScreen');
    navigation.navigate('Dialog');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginVertical: 8,
    minWidth: 280,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainScreen;
