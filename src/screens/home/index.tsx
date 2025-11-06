import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { auth } from 'firebaseConfig';
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
export const Home = ({ route, navigation }: Props) => {
  return (
    <View>
        <Text>Home Screen</Text>
        <Button mode="contained" onPress={() => navigation.navigate('Document')}>Publicar Documento</Button>
        <Button mode="contained" onPress={() => {
            auth.signOut();
        }}>Cerrar sesion</Button>
    </View>
  )
}
