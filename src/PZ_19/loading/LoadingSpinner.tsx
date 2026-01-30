import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';
import LogoSvg from '../assets/logo.svg';
import {colors} from '../../styles/colors.ts';

Sound.setCategory('Playback');

const LoadingSpinner = ({ size = 80 }) => {
  useEffect(() => {
    const sound = new Sound('loader.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Не удалось загрузить звук', error);
        return;
      }
      sound.setVolume(0.7).play();
    });

    return () => {
      sound.release();
    };
  }, []);

  return (
    <View style={styles.center}>
      {/*<LogoSvg width={size} height={size} />*/}
      <></>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,   // предполагаю, что colors импортирован где-то выше
  },
});

export default LoadingSpinner;
