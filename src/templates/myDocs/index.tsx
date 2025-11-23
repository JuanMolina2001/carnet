import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ListDocs } from './listDocs';
import { Map } from './map';
const Stack = createNativeStackNavigator<MyDocsStackParamList>();
export const MyDocs = () => {
  return (
    <Stack.Navigator initialRouteName="ListDocs">
      <Stack.Screen name="ListDocs" component={ListDocs} options={{
        title: 'Mis Documentos',
      }} />
      <Stack.Screen name="Location" component={Map} options={{
        title: 'Mapa de Comisaría',
      }} />
    </Stack.Navigator>
  )
}

