import React from 'react'
import { RegisterContext } from '@/context/register'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Step1, Step2, Biometric } from '@/templates/register';
import { KeyboardAvoidingView, Platform, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'react-native-paper';
import { AppContext } from '@/context/app';
import { baasAdapter } from '@/adapters/baas';
import { useNavigation } from '@react-navigation/native';
const Stack = createNativeStackNavigator<RegisterStackParamList>();
type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export const Register = ({ navigation, route }: Props) => {
    const { setLoading } = React.useContext(AppContext);
    const [biometricScreen, setBiometricScreen] = React.useState(false);
    const [userData, setUserData] = React.useState<RegisterContextType["userData"]>({
        email: "",
        password: "",
        confirmPassword: "",
        rut: "",
        name: "",
        lastName: ""
    });
    const handleLogin = async () => {
        try {
            setLoading(true);
            if (userData.email && userData.password && userData.rut) {
                await baasAdapter.register({
                    email: userData.email,
                    password: userData.password,
                    rut: userData.rut,
                    name: userData.name || "",
                    lastName: userData.lastName || ""
                });
            }
        } catch (error: any) {
            setLoading({
                loading: false,
                icon: 'Failure error icon'
            });
            const errorMessage = error.message;
            ToastAndroid.show(errorMessage, ToastAndroid.LONG);
            navigation.pop(3)
        } finally {
            setLoading(false);
        }
    }
    const options = {
        title: 'Registro'
    }
    return (

        <RegisterContext.Provider value={{
            userData,
            setUserData,
            handleLogin,
            setBiometricScreen
        }}>
            <SafeAreaView style={{ flex: 1 }}>

                <Stack.Navigator initialRouteName="Step1"  >
                    <Stack.Screen name="Step1" component={Step1} options={options} />
                    <Stack.Screen name="Step2" component={Step2} options={options} />
                    <Stack.Screen name="Biometric" component={Biometric} options={options} />
                </Stack.Navigator>
                {!biometricScreen && <Button mode="text" onPress={() => navigation.navigate('Login')}>
                    Ya tengo una cuenta
                </Button>}

            </SafeAreaView>
        </RegisterContext.Provider>

    )
}


