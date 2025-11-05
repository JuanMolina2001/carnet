// ...existing code...
import React from "react";
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import { User } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
export const UserContext = React.createContext({
    user: null as User | null,
    setUser: (user: User | null) => { },
});

export const UserProvider = ({ children }: { children?: React.ReactNode }) => {
    const [user, setUser] = React.useState<User | null>(null);

      const navigation = useNavigation();
      React.useEffect(() => {
        const auth = getAuth();
            // setPersistence(auth, browserLocalPersistence)
            // .then(() => {
            //     onAuthStateChanged(auth, (user) => {
            //     if (user) {
            //         navigation.navigate('Home' as never);
            //     } else {
            //         navigation.navigate('Login' as never);
            //     }
            //     });
            // })
            // .catch((error) => {
            //     console.error("Error setting persistence:", error);
            // });
      }, []);

 

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}