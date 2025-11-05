// ...existing code...
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { Map, Home, DocumentNotice, Auth } from './src/screens';
import { UserProvider } from './src/userContext';
import { navigationRef } from './src/navigation';
const Stack = createNativeStackNavigator();

export default function App() {


  return (

    <NavigationContainer ref={navigationRef}>
      <UserProvider>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen name="Map" component={Map} options={{
            title: 'Selecciona la comisaría',
          }} />
          <Stack.Screen name="Auth" component={Auth} options={{
            headerShown: false,
            
          }} />
          <Stack.Screen name="Home" component={Home} options={{
            headerBackVisible: false,
            gestureEnabled: false,
          }} />
          <Stack.Screen name="DocumentNotice" component={DocumentNotice} />
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