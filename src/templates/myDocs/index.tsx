import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Doc } from './doc';
import { ListDocs } from '@/templates/listDocs';
const Stack = createNativeStackNavigator<MyDocsStackParamList>();
export const MyDocs = () => {
  return (
    <Stack.Navigator initialRouteName="ListDocs">
      <Stack.Screen name="ListDocs" options={{ title: 'Documentos Publicados' }}>
        {({ navigation }) => (
          <ListDocs isMyDocs={true} navigation={navigation} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Doc" component={Doc} options={{
        title: 'Documento',
      }} />
    </Stack.Navigator>
  )
}

