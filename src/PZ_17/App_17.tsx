import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {launchImageLibrary, ImagePickerResponse, MediaType} from 'react-native-image-picker';
import * as ImageManipulator from 'react-native-image-manipulator';

type Screen = 'Main' | 'Edit';

const App_17: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('Main');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [editedImageUri, setEditedImageUri] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);

  const PICK_IMAGE_REQUEST_CODE = 100;

  // Выбор фотографии (аналог onActivityResult)
  const pickPhoto = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 1,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        return;
      }
      if (response.errorMessage) {
        Alert.alert('Ошибка', response.errorMessage);
        return;
      }
      if (response.assets && response.assets[0]) {
        const uri = response.assets[0].uri;
        if (uri) {
          setImageUri(uri);
          setEditedImageUri(uri);
          setRotation(0);
          setFlipHorizontal(false);
          setFlipVertical(false);
          setScreen('Edit');
        }
      }
    });
  };

  // Поворот на 90 градусов по часовой
  const rotateRight = async () => {
    if (!editedImageUri) return;
    setIsProcessing(true);
    try {
      const result = await ImageManipulator.manipulateAsync(
        editedImageUri,
        [{rotate: 90}],
        {compress: 1, format: ImageManipulator.SaveFormat.PNG},
      );
      setEditedImageUri(result.uri);
      setRotation((prev) => (prev + 90) % 360);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось повернуть изображение');
    } finally {
      setIsProcessing(false);
    }
  };

  // Поворот на 90 градусов против часовой
  const rotateLeft = async () => {
    if (!editedImageUri) return;
    setIsProcessing(true);
    try {
      const result = await ImageManipulator.manipulateAsync(
        editedImageUri,
        [{rotate: -90}],
        {compress: 1, format: ImageManipulator.SaveFormat.PNG},
      );
      setEditedImageUri(result.uri);
      setRotation((prev) => (prev - 90 + 360) % 360);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось повернуть изображение');
    } finally {
      setIsProcessing(false);
    }
  };

  // Отражение по горизонтали
  const flipHorizontally = async () => {
    if (!editedImageUri) return;
    setIsProcessing(true);
    try {
      const result = await ImageManipulator.manipulateAsync(
        editedImageUri,
        [{flip: ImageManipulator.FlipType.Horizontal}],
        {compress: 1, format: ImageManipulator.SaveFormat.PNG},
      );
      setEditedImageUri(result.uri);
      setFlipHorizontal((prev) => !prev);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось отразить изображение');
    } finally {
      setIsProcessing(false);
    }
  };

  // Отражение по вертикали
  const flipVertically = async () => {
    if (!editedImageUri) return;
    setIsProcessing(true);
    try {
      const result = await ImageManipulator.manipulateAsync(
        editedImageUri,
        [{flip: ImageManipulator.FlipType.Vertical}],
        {compress: 1, format: ImageManipulator.SaveFormat.PNG},
      );
      setEditedImageUri(result.uri);
      setFlipVertical((prev) => !prev);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось отразить изображение');
    } finally {
      setIsProcessing(false);
    }
  };

  // Дополнительная функция: изменение размера (масштабирование)
  const resizeImage = async (scale: number) => {
    if (!editedImageUri) return;
    setIsProcessing(true);
    try {
      const result = await ImageManipulator.manipulateAsync(
        editedImageUri,
        [{resize: {width: undefined, height: undefined}}], // Получаем размеры
        {compress: 1, format: ImageManipulator.SaveFormat.PNG},
      );
      // Для масштабирования нужно получить размеры изображения
      // Упрощенная версия - используем scale
      Alert.alert('Информация', `Масштаб: ${(scale * 100).toFixed(0)}%`);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось изменить размер');
    } finally {
      setIsProcessing(false);
    }
  };

  // Дополнительная функция: обрезка (crop)
  const cropImage = async () => {
    if (!editedImageUri) return;
    setIsProcessing(true);
    try {
      // Упрощенная версия - обрезка по центру
      Alert.alert('Информация', 'Функция обрезки (упрощенная версия)');
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось обрезать изображение');
    } finally {
      setIsProcessing(false);
    }
  };

  // Сброс к оригиналу
  const resetImage = () => {
    if (imageUri) {
      setEditedImageUri(imageUri);
      setRotation(0);
      setFlipHorizontal(false);
      setFlipVertical(false);
    }
  };

  // Возврат на главный экран
  const goHome = () => {
    setScreen('Main');
    setImageUri(null);
    setEditedImageUri(null);
    setRotation(0);
    setFlipHorizontal(false);
    setFlipVertical(false);
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
          editedImageUri && (
            <Image source={{uri: editedImageUri}} style={styles.image} resizeMode="contain" />
          )
        )}
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity style={styles.controlButton} onPress={rotateLeft} disabled={isProcessing}>
          <Text style={styles.controlButtonText}>↺</Text>
          <Text style={styles.controlButtonLabel}>Влево</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={rotateRight} disabled={isProcessing}>
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
