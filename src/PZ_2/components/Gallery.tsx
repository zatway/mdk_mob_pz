import React from 'react';
import {View, Image, FlatList, StyleSheet} from 'react-native';

const images = [
    require('../image/avatar.png'),
    require('../image/avatar.png'),
    require('../image/avatar.png'),
    require('../image/avatar.png'),
    require('../image/avatar.png'),
];

const Gallery = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                numColumns={3}
                renderItem={({item}) => (
                    <Image source={item} style={styles.image}/>
                )}
                keyExtractor={(_, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  image: {
    width: 112,
    height: 112,
    margin: 2,
  },
});

export default Gallery;
