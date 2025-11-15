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
    launchImageLibrary(options, async (response) => {
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
    // angle должен быть 0, 90, 180, 270
    const normalized = ((angle % 360) + 360) % 360; // нормализуем в [0, 360)
    switch (normalized) {
      case 90:
        return RotationMode.R90;
      case 180:
        return RotationMode.R180;
      case 270:
        return RotationMode.R270;
      default:
        return RotationMode.R90; // на случай 0 или некорректного значения
    }
  };

  const rotateImage = async (direction: 'left' | 'right') => {
    if (!editedImage) return;
    setIsProcessing(true);

    try {
      // Считаем новый угол
      const newRotation = direction === 'right'
        ? (rotation + 90) % 360
        : (rotation - 90 + 360) % 360; // +360 чтобы не было отрицательного

      // Выбираем RotationMode
      const rotationMode = getRotationMode(newRotation);

      const result = await PhotoManipulator.rotateImage(editedImage, rotationMode);

      setEditedImage(result);
      setRotation(newRotation);

    } catch {
      Alert.alert("Ошибка", "Не удалось повернуть изображение");
    } finally {
      setIsProcessing(false);
    }
  };

  const flipHorizontally = async () => {
    if (!editedImage) return;
    setIsProcessing(true);
    try {
      const result = await PhotoManipulator.flipImage(editedImage, FlipMode.Horizontal);
      setEditedImage(result);
    } catch {
      Alert.alert("Ошибка", "Не удалось отразить изображение");
    } finally {
      setIsProcessing(false);
    }
  };

  const flipVertically = async () => {
    if (!editedImage) return;
    setIsProcessing(true);
    try {
      const result = await PhotoManipulator.flipImage(editedImage, FlipMode.Vertical);
      setEditedImage(result);
    } catch {
      Alert.alert("Ошибка", "Не удалось отразить изображение");
    } finally {
      setIsProcessing(false);
    }
  };

  const resizeImage = async (scale: number) => {
    if (!editedImage) return;
    setIsProcessing(true);

    try {
      const size = await new Promise<{ width: number; height: number }>((resolve, reject) => {
        RNImage.getSize(
          editedImage.toString(),
          (width, height) => resolve({ width, height }),
          reject
        );
      });

      const newWidth = Math.round(size.width * scale);
      const newHeight = Math.round(size.height * scale);

      const result = await PhotoManipulator.crop(
        editedImage,
        { x: 0, y: 0, width: size.width, height: size.height },
        { width: newWidth, height: newHeight }
      );

      setEditedImage(result);

    } catch {
      Alert.alert("Ошибка", "Не удалось изменить размер изображения");
    } finally {
      setIsProcessing(false);
    }
  };

  const cropImage = async () => {
    if (!editedImage) return;
    setIsProcessing(true);

    try {
      const size = await new Promise<{width: number, height: number}>((resolve, reject) => {
        RNImage.getSize(
            editedImage.toString(),
          (width, height) => resolve({width, height}),
          reject
        );
      });

      const cropWidth = size.width * 0.8;
      const cropHeight = size.height * 0.8;

      const rect = {
        x: (size.width - cropWidth) / 2,
        y: (size.height - cropHeight) / 2,
        width: cropWidth,
        height: cropHeight,
      };

      const result = await PhotoManipulator.crop(editedImage, rect);
      setEditedImage(result);

    } catch {
      Alert.alert("Ошибка", "Не удалось обрезать изображение");
    } finally {
      setIsProcessing(false);
    }
  };

  // Сброс к оригиналу
  const resetImage = () => {
    if (imageUri) {
      setEditedImage(imageUri)
    }
  };

  // Возврат на главный экран
  const goHome = () => {
    setScreen('Main');
    setImageUri(null);
    setEditedImage(null);
  };

  // MainActivity - выбор фотографии
  if (screen === 'Main') {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Редактор изображений</Text>
        <Text style={styles.subtitle}>Выберите фотографию для редактирования</Text>

        <TouchableOpacity style={styles.pickButton} onPress={pickPhoto}>
          <Text style={styles.pickButtonText}>📷 Выбрать фотографию</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // EditImageActivity - редактирование изображения
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Редактирование изображения</Text>

      <View style={styles.imageContainer}>
        {isProcessing ? (
          <ActivityIndicator size="large" color="#6200EE" />
        ) : (
          editedImage && (
            <Image source={{uri: editedImage.toString()}} style={styles.image} resizeMode="contain" />
          )
        )}
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity style={styles.controlButton} onPress={() => rotateImage('left')} disabled={isProcessing}>
          <Text style={styles.controlButtonText}>↺</Text>
          <Text style={styles.controlButtonLabel}>Влево</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={() => rotateImage('right')} disabled={isProcessing}>
          <Text style={styles.controlButtonText}>↻</Text>
          <Text style={styles.controlButtonLabel}>Вправо</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={flipHorizontally}
          disabled={isProcessing}>
          <Text style={styles.controlButtonText}>⇄</Text>
          <Text style={styles.controlButtonLabel}>Гориз.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={flipVertically}
          disabled={isProcessing}>
          <Text style={styles.controlButtonText}>⇅</Text>
          <Text style={styles.controlButtonLabel}>Вертик.</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.additionalControlsRow}>
        <TouchableOpacity style={styles.additionalButton} onPress={resetImage} disabled={isProcessing}>
          <Text style={styles.additionalButtonText}>🔄 Сброс</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.additionalButton}
          onPress={() => resizeImage(0.8)}
          disabled={isProcessing}>
          <Text style={styles.additionalButtonText}>🔍 Уменьшить</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.additionalButton}
          onPress={() => resizeImage(1.2)}
          disabled={isProcessing}>
          <Text style={styles.additionalButtonText}>🔍 Увеличить</Text>
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
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#212121',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 20,
    textAlign: 'center',
  },
  pickButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  pickButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 16,
    padding: 20,
    minHeight: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    maxHeight: 400,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#E0E0E0',
    borderRadius: 35,
  },
  controlButtonText: {
    fontSize: 28,
    marginBottom: 4,
  },
  controlButtonLabel: {
    fontSize: 10,
    color: '#424242',
    fontWeight: '600',
  },
  additionalControlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  additionalButton: {
    backgroundColor: '#9C27B0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  additionalButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  backButton: {
    backgroundColor: '#9E9E9E',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default App_17;
