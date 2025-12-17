import { Login } from '@/screens/auth/login';
import { Register } from '@/screens/auth/register';
// ...existing code...
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PasswordReset } from '@/screens/auth/passwordReset';
const Stack = createNativeStackNavigator<AuthStackParamList>();
export const Auth = () => {

  return (

    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{
        headerBackVisible: false,
        gestureEnabled: false,
        title: "Iniciar Sesión"
      }} />
      <Stack.Screen name="Register" component={Register} options={{
        title: "Registrarse",
        headerShown: false,
      }} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} options={{
        title: "Restablecer Contraseña",
      }} />
    </Stack.Navigator>
  );
}