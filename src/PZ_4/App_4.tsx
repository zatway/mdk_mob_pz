import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import ImageViewer from './ImageViewer.tsx';

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
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
});

export default App_4;
