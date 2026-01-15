import {FlexWidget, TextWidget, WidgetTaskHandler} from 'react-native-android-widget';
import {ConnectFetch} from './ConnectFetch.ts';
import {Alert} from 'react-native';
import React from 'react';
import {WeatherWidget} from './WeatherWidget.tsx';

const API_KEY = '6024451a53cc956ea99b639a491a7b5c';

export const widgetTaskHandler: WidgetTaskHandler = async (props) => {
  const { widgetAction, widgetInfo } = props;

  console.log(`Widget Task: ${widgetAction} ID: ${widgetInfo.widgetId}`);

  if (
    widgetAction === 'WIDGET_ADDED' ||
    widgetAction === 'WIDGET_UPDATE' ||
    widgetAction === 'WIDGET_RESIZED'
  ) {
    try {
      const data = await ConnectFetch.getJSON('Orenburg', API_KEY);

      if (data) {
        props.renderWidget(
          <WeatherWidget
            city={data.name}
            temp={data.main.temp.toFixed(1)}
            description={data.weather[0].description}
            iconUrl={ConnectFetch.getIconUrl(data)}
          />
        );
      } else {
        props.renderWidget(
          <FlexWidget style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#eeeeee'}}>
            <TextWidget text="Загрузка данных..." />
          </FlexWidget>
        );
      }
    } catch (e) {
      console.log('Widget Error:', e);
    }
  }
};
