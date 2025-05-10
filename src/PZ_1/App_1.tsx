import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from "./screens/MainScreen.tsx";
import NormalScreen from "./screens/NormalScreen.tsx";
import DialogScreen from "./screens/DialogScreen.tsx";

const Stack = createNativeStackNavigator();

const App_1 = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={MainScreen}
                />
                <Stack.Screen
                    name="Normal"
                    component={NormalScreen}
                    options={{title: 'Normal Screen'}}
                />
                <Stack.Screen
                    name="Dialog"
                    component={DialogScreen}
                    options={{
                        title: 'Dialog Screen',
                        presentation: 'modal',
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App_1;
