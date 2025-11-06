import React from 'react'
import { RegisterContext } from './context'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Step1, Biometric, Step2 } from './steps';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'firebaseConfig';
import { ToastAndroid, View } from 'react-native';
import { Button } from 'react-native-paper';
const Stack = createNativeStackNavigator<RegisterStackParamList>();
type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export const Register = ({ navigation }: Props) => {
    const [userData, setUserData] = React.useState<RegisterContextType["userData"]>({
        email: "",
        password: "",
        confirmPassword: "",
        rut: "",
        name: "",
        lastName: ""
    });
    const handleLogin = () => {
        if (userData.email && userData.password) {
            createUserWithEmailAndPassword(auth, userData.email, userData.password)
                .then(() => {
                    ToastAndroid.show("Usuario registrado exitosamente", ToastAndroid.LONG);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error('Error registering user:', errorCode, errorMessage);
                    ToastAndroid.show(`Error al registrar usuario: ${errorMessage}`, ToastAndroid.LONG);
                });
        }
    }
    const options = {
        title: 'Registro'
    }
    return (
        <RegisterContext.Provider value={{
            userData,
            setUserData,
            handleLogin
        }}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                    <Stack.Navigator initialRouteName="Step1">
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
    )
}


