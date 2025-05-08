import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Main: undefined;
  Normal: undefined;
  Dialog: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>; 