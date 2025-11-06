import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
export const Home = ({ route, navigation }: Props) => {
  return (
    <View>
        <Text>Home Screen</Text>
        <Button mode="contained" onPress={() => navigation.navigate('Document')}>Publicar Documento</Button>
    </View>
  )
}
