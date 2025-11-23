import React from 'react'
import { RegisterContext } from '@/context/register'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Step1, Step2, Biometric} from '@/templates/register';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/config/firebase';
import { ToastAndroid, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Loading } from '@/components/loading';
import { doc, setDoc } from 'firebase/firestore';
import * as Crypto from 'expo-crypto';
import { UserContext } from '@/context/user';
import { formatRut } from 'rutlib';
const Stack = createNativeStackNavigator<RegisterStackParamList>();
type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export const Register = ({ navigation }: Props) => {
    const { setRut } = React.useContext(UserContext);
    const [isLoading, setIsLoading] = React.useState(false);
    const [userData, setUserData] = React.useState<RegisterContextType["userData"]>({
        email: "",
        password: "",
        confirmPassword: "",
        rut: "",
        name: "",
        lastName: ""
    });
    const handleLogin = () => {
        setIsLoading(true);
        if (userData.email && userData.password && userData.rut) {
            createUserWithEmailAndPassword(auth, userData.email, userData.password)

                .then(async (userCredential) => {
                    const rut = await Crypto.digestStringAsync(
                        Crypto.CryptoDigestAlgorithm.SHA256,
                        formatRut(userData.rut!)
                    );
                    await setDoc(doc(db, "users", rut), {
                        email: userData.email,
                        name: userData.name,
                        lastName: userData.lastName,
                        created_at: new Date(),

                    });
                    setRut(rut);
                    ToastAndroid.show("Usuario registrado exitosamente", ToastAndroid.LONG);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error('Error registering user:', errorCode, errorMessage);
                    ToastAndroid.show(`Error al registrar usuario: ${errorMessage}`, ToastAndroid.LONG);
                    setIsLoading(false);
                });
        }
        setIsLoading(false);
    }
    const options = {
        title: 'Registro'
    }
    return (
        <>
            <Loading visible={isLoading} />
            <RegisterContext.Provider value={{
                userData,
                setUserData,
                handleLogin
            }}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ flex: 1 }}>
                        <Stack.Navigator initialRouteName="Biometrics">
                            <Stack.Screen name="Step1" component={Step1} options={options} />
                            <Stack.Screen name="Step2" component={Step2} options={options} />
                            <Stack.Screen name="Biometrics" component={Biometric} options={options} /> 
                        </Stack.Navigator>
                    </View>

                    <View style={{ padding: 16 }}>
                        <Button mode="text" onPress={() => navigation.navigate('Login')}>
                            Ya tengo una cuenta
                        </Button>
                    </View>
                </View>
            </RegisterContext.Provider>
        </>
    )
}


