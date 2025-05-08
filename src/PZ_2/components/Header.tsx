import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.background}/>
            <Image
                source={require('../image/avatar.png')}
                style={styles.profileImage}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 135,
        width: '100%',
    },
    background: {
        position: 'absolute',
        backgroundColor: '#42ff00',
        width: '100%',
        height: '100%',
    },
    profileImage: {
        width: 125,
        height: 125,
        borderRadius: 62,
        position: 'absolute',
        alignSelf: 'center',
        top: 5,
    },
});
export default Header;
