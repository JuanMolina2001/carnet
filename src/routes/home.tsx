import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LostItemForm } from '@/screens/LostItemForm';
import { MyDocs } from '@/templates/myDocs';
import { Options } from '@/screens/options';
import { MaterialIcons, MaterialIconsIconName } from '@react-native-vector-icons/material-icons';
import { AppContext } from '@/context/app';
import React from 'react';
import { Verify } from '@/screens/verify';
import { baasAdapter } from '@/adapters/baas';
const Tab = createBottomTabNavigator();

export const Home = () => {
  const { isPolice } = React.useContext(AppContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let icon: MaterialIconsIconName = 'help-center';

          if (route.name === 'MyDocs') icon = 'folder';
          if (route.name === 'LostItemForm') icon = 'document-scanner';
          if (route.name === 'Profile') icon = 'account-circle';
          if (route.name === 'Scan') icon = 'qr-code-scanner';
          if (route.name === 'AllDocs') icon = 'search';

          return <MaterialIcons name={icon} size={size} color={color} />;
        }
      })}
    >{
        !isPolice ? (
          <>
            <Tab.Screen name="MyDocs" component={MyDocs} options={{ title: 'Mis documentos' }} />
            <Tab.Screen name="LostItemForm" component={LostItemForm} options={{ title: 'Publicar' }} />
          </>
        ) :
          <>
            <Tab.Screen name="Scan" component={Verify} options={{ title: 'Escanear', headerShown: true, }} />
            <Tab.Screen name="AllDocs" component={MyDocs} options={{ title: 'Buscar Documentos' }} />
          </>
      }

      <Tab.Screen name="Profile" component={Options} options={{ title: 'Perfil', headerShown: true, }} />

    </Tab.Navigator>
  );
}
