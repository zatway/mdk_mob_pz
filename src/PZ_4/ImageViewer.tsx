import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions, ViewStyle, ImageStyle,
} from 'react-native';
import {commonStyles} from '../styles/commonStyles.ts';
import {colors} from '../styles/colors.ts';

const images = [
    require('./assets/3.jpg'),
    require('./assets/1.jpg'),
    require('./assets/4.jpg'),
    require('./assets/2.jpg'),
    require('./assets/5.jpg'),
];

const ImageViewer = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <View style={styles.container}>
            <Image
                source={images[currentIndex]}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.imageNumber}>
                Изображение {currentIndex + 1} из {images.length}
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handlePrevious}
                >
                    <Text style={styles.buttonText}>Предыдущий</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleNext}
                >
                    <Text style={styles.buttonText}>Следующий</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.containerCentered,
    padding: 20,
    backgroundColor: colors.backgroundGrey,
  } as ViewStyle,
  image: {
    width: Dimensions.get('window').width - 40,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  } as ImageStyle,
  imageNumber: {
    fontSize: 18,
    marginBottom: 20,
    color: colors.textDark,
  },
  buttonContainer: {
    ...commonStyles.rowSpaceBetween,
    width: '100%',
    paddingHorizontal: 20,
  } as ViewStyle,
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
export default ImageViewer;
