import { TypeDoc } from './type';
import { Map } from './map';
// ...existing code...
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { DocContextProvider } from './docContext';
const Stack = createNativeStackNavigator<DocumentStackParamList>();

export const DocumentNotice = () => {
    return (
        <DocContextProvider>
            <Stack.Navigator initialRouteName="TypeDoc">
                <Stack.Screen name="TypeDoc" component={TypeDoc} />
                <Stack.Screen name="Map" component={Map} options={{
                    title: 'Selecciona la comisaría',
                }} />
            </Stack.Navigator>
        </DocContextProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
