import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export const Home = () => {
  const navigation = useNavigation();

  return (
    <View>
        <Text>Home Screen</Text>
        <Button mode="contained" onPress={() => navigation.navigate('DocumentNotice' as never)}>Publicar Documento</Button>
    </View>
  )
}
