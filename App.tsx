// ...existing code...
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { Login, Map, Register, Home, DocumentNotice } from './src/screens';
import { UserProvider } from './src/userContext';
import { navigationRef } from './src/navigation';
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { app } from './firebaseConfig';
const Stack = createNativeStackNavigator();

export default function App() {


  return (

    <NavigationContainer ref={navigationRef}>
      <UserProvider>
        <Stack.Navigator initialRouteName="Map">
          <Stack.Screen name="Map" component={Map} options={{
            title: 'Selecciona la comisaría',
          }} />
          <Stack.Screen name="Login" component={Login} options={{
            headerBackVisible: false,
            gestureEnabled: false,
          }} />
          <Stack.Screen name="Register" component={Register} />
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