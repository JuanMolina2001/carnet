import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LostItemForm } from '@/templates/LostItemForm';
import { MyDocs } from '@/templates/myDocs';
import Account from '@/templates/account';
import { MaterialIcons, MaterialIconsIconName } from '@react-native-vector-icons/material-icons';

const Tab = createBottomTabNavigator();

export const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let icon : MaterialIconsIconName = 'help-center';

          if (route.name === 'MyDocs') icon = 'folder';
          if (route.name === 'LostItemForm') icon = 'document-scanner';
          if (route.name === 'Profile') icon = 'account-circle';

          return <MaterialIcons name={icon} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="MyDocs" component={MyDocs} options={{ title: 'Mis documentos' }} />
      <Tab.Screen name="LostItemForm" component={LostItemForm} options={{ title: 'Publicar' }} />
      <Tab.Screen name="Profile" component={Account} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}
