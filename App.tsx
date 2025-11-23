// ...existing code...
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { Home, Auth } from '@/screens';
import { UserContext } from '@/context/user';
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from '@/config/firebase';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs, query, where } from 'firebase/firestore';
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  const [user, setUser] = React.useState<User | null>(null);
  const [rut, setRut] = React.useState<string>('');
  const [docs, setDocs] = React.useState<DocData[]>([]);
  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {

        setUser(user);
        (async () => {
          if (!rut) {
            const storedRut = await AsyncStorage.getItem('rut');
            storedRut && setRut(storedRut);

          } else {
            AsyncStorage.setItem('rut', rut);
          }
          const ref = collection(db, "documents");
          const q = query(ref, where("owner_id", "==", rut));

          const snapshot = await getDocs(q);
          const fetchedDocs: DocData[] = [];
          snapshot.forEach(doc => {
            fetchedDocs.push({ id: doc.id, ...doc.data() } as DocData);
          });
          setDocs(fetchedDocs);
        })();

      } else {
        setUser(null);
        AsyncStorage.removeItem('rut');
      }
    });
    return () => unsub();
  }, [rut]);
  return (

    <NavigationContainer>
      <UserContext.Provider value={{ user, setUser, rut, setRut, docs, setDocs }}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={user ? Home : Auth} options={{
            headerShown: false,
            headerBackVisible: false,
            gestureEnabled: false,
          }} />
        </Stack.Navigator>
      </UserContext.Provider>
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