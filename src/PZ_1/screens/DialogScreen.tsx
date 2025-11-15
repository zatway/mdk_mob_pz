import React from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity, TextStyle} from 'react-native';
import { NavigationProps } from '../types/navigation.ts';
import {commonStyles} from '../../styles/commonStyles.ts';
import {colors} from '../../styles/colors.ts';

interface Props {
  navigation: NavigationProps;
}

const DialogScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Modal transparent animationType="fade" onRequestClose={() => navigation.goBack()}>
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.text}>Это диалоговая деятельность</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={commonStyles.buttonText as TextStyle}>ЗАКРЫТЬ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...commonStyles.container,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 24,
    minWidth: 280,
    alignItems: 'center',
    elevation: 4,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
  },
});

export default DialogScreen;
