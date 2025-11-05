import { Login } from './login';
import { Register } from './register';
// ...existing code...
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
const Stack = createNativeStackNavigator();

export const Auth = () => {


  return (

      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{
          headerBackVisible: false,
          gestureEnabled: false,
        }} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
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
