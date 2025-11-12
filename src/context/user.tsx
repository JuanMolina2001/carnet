// ...existing code...
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { User } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '@/config/firebase';
export const UserContext = React.createContext({
    user: null as User | null,
    setUser: (user: User | null) => { },
});

export const UserProvider = ({ children }: { children?: React.ReactNode }) => {
    const [user, setUser] = React.useState<User | null>(null);

    const navigation = useNavigation();
    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.navigate('Home' as never);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' as never }],
                });
                setUser(user);
            } else {
                navigation.navigate('Auth' as never);
                setUser(null);
            }
        });
    }, []);



    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}