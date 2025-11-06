import React from 'react'
import { RegisterContext } from './context'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Step1 } from './step1';
import { Step2 } from './step2';
import { Biometric } from './biometric';
const Stack = createNativeStackNavigator<RegisterStackParamList>();

export const Register = () => {
    const [name, setName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [rut, setRut] = React.useState('');
    return (
        <RegisterContext.Provider value={{
            name,
            setName,
            lastName,
            setLastName,
            email,
            setEmail,
            password,
            setPassword,
            confirmPassword,
            setConfirmPassword,
            rut,
            setRut
        }}>
            <Stack.Navigator initialRouteName="Step1">
                <Stack.Screen name="Step1" component={Step1} />
                <Stack.Screen name="Step2" component={Step2} />
                <Stack.Screen name="Biometrics" component={Biometric} />
            </Stack.Navigator>
        </RegisterContext.Provider>
    )
}

