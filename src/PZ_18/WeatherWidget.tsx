import React from 'react';
import {
  FlexWidget,
  TextWidget,
  ImageWidget,
  ImageWidgetSource,
} from 'react-native-android-widget';

interface WidgetProps {
  temp: string;
  city: string;
  description: string;
  iconUrl: string;
}

export function WeatherWidget({ temp, city, description, iconUrl }: WidgetProps) {
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#FFFFFF',
        padding: 16,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TextWidget
        text={city}
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#000000',
          textAlign: 'center'
        }}
      />

      <TextWidget
        text={`${temp} ℃`}
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: '#6200EE',
          marginVertical: 8
        }}
      />

      <TextWidget
        text={description}
        style={{
          fontSize: 14,
          color: '#757575',
          textAlign: 'center'
        }}
      />
    </FlexWidget>
  );
}
