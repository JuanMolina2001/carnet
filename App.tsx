// ...existing code...
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import {  Home, Auth } from './src/screens';
import { UserProvider } from './src/userContext';
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {


  return (

    <NavigationContainer>
      <UserProvider>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen name="Auth" component={Auth} options={{
            headerShown: false,
            
          }} />
          <Stack.Screen name="Home" component={Home} options={{
            headerBackVisible: false,
            gestureEnabled: false,
            headerShown: false,
          }} />

        </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
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