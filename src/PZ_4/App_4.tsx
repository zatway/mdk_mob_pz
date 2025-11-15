import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import ImageViewer from './ImageViewer.tsx';
import {commonStyles} from '../styles/commonStyles.ts';
import {colors} from '../styles/colors.ts';

const App_4 = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content"/>
            <ImageViewer/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    backgroundColor: colors.backgroundGrey,
  },
});

export default App_4;
