import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Image as RNImage,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import PhotoManipulator, {
  FlipMode,
  ImageSource,
  RotationMode,
} from 'react-native-photo-manipulator';
import RNFS from 'react-native-fs';
import {commonStyles} from '../styles/commonStyles.ts';
import {colors} from '../styles/colors.ts';

type Screen = 'Main' | 'Edit';

const App_17: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('Main');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<ImageSource | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rotation, setRotation] = useState<number>(0);

  const pickPhoto = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, async response => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        Alert.alert('Ошибка', response.errorMessage);
        return;
      }

      if (response.assets && response.assets[0]) {
        let uri = response.assets[0].uri;
        if (uri) {
          const realUri = await getRealPath(uri);
          setImageUri(realUri);
          setEditedImage(realUri);
          setScreen('Edit');
        }
      }
    });
  };

  async function getRealPath(uri: string): Promise<string> {
    if (uri.startsWith('file://')) return uri;

    const newPath = RNFS.CachesDirectoryPath + '/image_' + Date.now() + '.jpg';
    await RNFS.copyFile(uri, newPath);
    return 'file://' + newPath;
  }

  const getRotationMode = (angle: number): RotationMode => {
    const normalized = ((angle % 360) + 360) % 360;
    switch (normalized) {
      case 90:
        return RotationMode.R90;
      case 180:
        return RotationMode.R180;
      case 270:
        return RotationMode.R270;
      default:
        return RotationMode.R90;
    }
  };

  const rotateImage = async (direction: 'left' | 'right') => {
    if (!editedImage) return;
    setIsProcessing(true);

    try {
      const newRotation =
        direction === 'right'
          ? (rotation + 90) % 360
          : (rotation - 90 + 360) % 360;

      const rotationMode = getRotationMode(newRotation);

      const result = await PhotoManipulator.rotateImage(
        editedImage,
        rotationMode,
      );

      setEditedImage(result);
      setRotation(newRotation);
    } catch {
      Alert.alert('Ошибка', 'Не удалось повернуть изображение');
    } finally {
      setIsProcessing(false);
    }
  };

  const flipHorizontally = async () => {
    if (!editedImage) return;
    setIsProcessing(true);
    try {
      const result = await PhotoManipulator.flipImage(
        editedImage,
        FlipMode.Horizontal,
      );
      setEditedImage(result);
    } catch {
      Alert.alert('Ошибка', 'Не удалось отразить изображение');
    } finally {
      setIsProcessing(false);
    }
  };

  const flipVertically = async () => {
    if (!editedImage) return;
    setIsProcessing(true);
    try {
      const result = await PhotoManipulator.flipImage(
        editedImage,
        FlipMode.Vertical,
      );
      setEditedImage(result);
    } catch {
      Alert.alert('Ошибка', 'Не удалось отразить изображение');
    } finally {
      setIsProcessing(false);
    }
  };

  const resizeImage = async (scale: number) => {
    if (!editedImage) return;
    setIsProcessing(true);

    try {
      const size = await new Promise<{width: number; height: number}>(
        (resolve, reject) => {
          RNImage.getSize(
            editedImage.toString(),
            (width, height) => resolve({width, height}),
            reject,
          );
        },
      );

      const newWidth = Math.round(size.width * scale);
      const newHeight = Math.round(size.height * scale);

      const result = await PhotoManipulator.crop(
        editedImage,
        {x: 0, y: 0, width: size.width, height: size.height},
        {width: newWidth, height: newHeight},
      );

      setEditedImage(result);
    } catch {
      Alert.alert('Ошибка', 'Не удалось изменить размер изображения');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetImage = () => {
    if (imageUri) {
      setEditedImage(imageUri);
    }
  };

  const goHome = () => {
    setScreen('Main');
    setImageUri(null);
    setEditedImage(null);
  };

  if (screen === 'Main') {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Редактор изображений</Text>
        <Text style={styles.subtitle}>
          Выберите фотографию для редактирования
        </Text>

        <TouchableOpacity style={styles.pickButton} onPress={pickPhoto}>
          <Text style={styles.pickButtonText}>📷 Выбрать фотографию</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        {isProcessing ? (
          <ActivityIndicator size="large" color="#6200EE" />
        ) : (
          editedImage && (
            <Image
              source={{uri: editedImage.toString()}}
              style={styles.image}
              resizeMode="contain"
            />
          )
        )}
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => rotateImage('left')}
          disabled={isProcessing}>
          <Text style={styles.controlButtonLabel}>Влево</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => rotateImage('right')}
          disabled={isProcessing}>
          <Text style={styles.controlButtonLabel}>Вправо</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={flipHorizontally}
          disabled={isProcessing}>
          <Text style={styles.controlButtonLabel}>Гориз.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={flipVertically}
          disabled={isProcessing}>
          <Text style={styles.controlButtonLabel}>Вертик.</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.additionalControlsRow}>
        <TouchableOpacity
          style={styles.additionalButton}
          onPress={resetImage}
          disabled={isProcessing}>
          <Text style={styles.additionalButtonText}>Сброс</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.additionalButton}
          onPress={() => resizeImage(0.8)}
          disabled={isProcessing}>
          <Text style={styles.additionalButtonText}>Уменьшить</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.additionalButton}
          onPress={() => resizeImage(1.2)}
          disabled={isProcessing}>
          <Text style={styles.additionalButtonText}>Увеличить</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={goHome}>
        <Text style={styles.backButtonText}>Назад к выбору</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    backgroundColor: colors.white,
    padding: 16,
  },
  title: {
    ...commonStyles.title,
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    ...commonStyles.subtitle,
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  pickButton: {
    backgroundColor: colors.primaryPurple,
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  pickButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  imageContainer: {
    ...commonStyles.containerCentered,
    backgroundColor: colors.backgroundGrey,
    borderRadius: 12,
    marginBottom: 16,
    padding: 20,
    minHeight: 300,
  } as ViewStyle,
  image: {
    width: '100%',
    height: '100%',
    maxHeight: 400,
  },
  controlsRow: {
    ...commonStyles.row,
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
  } as ViewStyle,
  controlButton: {
    ...commonStyles.containerCentered,
    width: 70,
    height: 70,
    backgroundColor: colors.divider,
    borderRadius: 35,
  } as ViewStyle,
  controlButtonText: {
    fontSize: 28,
    marginBottom: 4,
  },
  controlButtonLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  additionalControlsRow: {
    ...commonStyles.row,
    justifyContent: 'space-around',
    marginBottom: 16,
  } as ViewStyle,
  additionalButton: {
    backgroundColor: colors.accentPurple,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  additionalButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  backButton: {
    backgroundColor: colors.greyMedium,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  backButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default App_17;
