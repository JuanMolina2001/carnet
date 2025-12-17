// ...existing code...
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { Home, Auth } from '@/routes';
import { MailConfirm } from '@/screens/mailConfirm';
import { TermsNconditions } from '@/screens/termsNconditions';
import { Account } from '@/screens/account';
import { Qr } from '@/screens/qr';
import { AppContextProvider } from '@/context/app';
import { User, baasAdapter } from "@/adapters/baas";
import * as Notifications from "expo-notifications";
import { Map } from '@/screens/map';
import { PaperProvider } from 'react-native-paper';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
  const [user, setUser] = React.useState<User | null>(null);
  const [rut, setRut] = React.useState<string | null>(null);
  const [docs, setDocs] = React.useState<LostDocument[] | null>(null);
  const [publishedDocs, setPublishedDocs] = React.useState<PublishedDoc[] | null>(null);
  const isPolice = !!(user?.email?.split('@')[1] === baasAdapter.domain)
  React.useEffect(() => {
    (async () => {
      console.log(user)
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permiso denegado");

      }
    })();
    if (!rut) return;
    let allListener = () => { }
    let unsubscribe1 = () => { };
    let unsubscribe2 = () => { };
    if (isPolice) {
      allListener = baasAdapter.listenerAllDocuments((documents) => {
        setDocs(documents);
      })

    } else {
      unsubscribe2 = baasAdapter.listenerPublished(rut, (documents) => {
        setPublishedDocs(documents);
      });
      unsubscribe1 = baasAdapter.listenerDocuments(rut, (documents) => {
        setDocs(documents);
      });
    }

    return () => {
      allListener()
      unsubscribe1();
      unsubscribe2();
    }
  }, [rut]);

  return (
    <NavigationContainer>
      <PaperProvider>
        <AppContextProvider values={{
          user,
          setRut,
          setUser,
          rut,
          docs,
          setDocs,
          publishedDocs,
          setPublishedDocs,
          isPolice,
        }}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={user ? Home : Auth} options={{
              headerShown: false,
              headerBackVisible: false,
              gestureEnabled: false,
            }} />
            <Stack.Screen name="MailConfirm" component={MailConfirm} options={{
              title: "Confirmar correo",
              headerBackVisible: false,
            }} />
            <Stack.Screen name="TermsNconditions" component={TermsNconditions} options={{
              title: "Términos y condiciones",
            }} />
            <Stack.Screen name="Qr" component={Qr} options={{
              title: "Código QR",
            }} />
            <Stack.Screen name="Account" component={Account} options={{
              title: "Mi cuenta",
            }} />
            <Stack.Screen name="Map" component={Map} options={{
              title: "Mapa de comisarías",
            }} />
          </Stack.Navigator>
        </AppContextProvider>
      </PaperProvider>
    </NavigationContainer>
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