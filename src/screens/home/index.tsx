import React from 'react'
import { Text, View } from 'react-native'
import { Button, BottomNavigation } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LostItemForm,MyDocs } from '@/tabs/home';
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
export const Home = ({ route, navigation }: Props) => {
  const [routes] = React.useState([
    { key: 'MyDocs', title: 'Mis documentos', focusedIcon: 'folder' },
    { key: 'LostItemForm', title: 'Publicar documento', focusedIcon: 'file-document' },

  ]);
  const [index, setIndex] = React.useState(0);
  const renderScene = BottomNavigation.SceneMap({
    LostItemForm: LostItemForm,
    MyDocs: () => <View><Text>Mis Documentos</Text></View>,

  });
  return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
  )
}
