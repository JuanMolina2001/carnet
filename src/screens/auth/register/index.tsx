import React from 'react'
import { Text, View, StyleSheet, ToastAndroid, KeyboardAvoidingView, Platform } from 'react-native'
import { app } from '../../../../firebaseConfig';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { TextInput, Button, HelperText } from 'react-native-paper';
import Biometric from './biometric';
import { formatRut } from 'rutlib'
import { UserContext } from '../../../userContext';
import { useNavigation } from '@react-navigation/native';
import { validateCredentials } from './validations';
export const Register = () => {
    const [name, setName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [rut, setRut] = React.useState('');
    const [steps, setSteps] = React.useState(0);
    const { setUser } = React.useContext(UserContext);
    const navigation = useNavigation();
    const handleLogin = () => {
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log('User registered:', user);
                ToastAndroid.show("Usuario registrado exitosamente", ToastAndroid.LONG);
                setUser(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error registering user:', errorCode, errorMessage);
                ToastAndroid.show(`Error al registrar usuario: ${errorMessage}`, ToastAndroid.LONG);
                setSteps(0);
            });
    }
    if (steps === 1) {
        return <Biometric onSuccess={() => {
            handleLogin();
        }} />
    }
    return (
        <View style={styles.container}>
            <TextInput label="Nombres" style={styles.input} value={name} onChangeText={setName} />
            <TextInput label="Apellidos" style={styles.input} value={lastName} onChangeText={setLastName} />
            <TextInput label="RUT" style={styles.input} value={rut} onChangeText={(t) => { setRut(formatRut(t)) }} />
            <TextInput label="Email" style={styles.input} value={email} onChangeText={setEmail} />
            <TextInput label="Contraseña" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
            <TextInput label="Confirmar Contraseña" style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
            <Button mode="contained" onPress={() => {
                try {
                    validateCredentials(email, password, rut, name, lastName, confirmPassword);
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        ToastAndroid.show(error.message || "Error en la validación", ToastAndroid.LONG);
                    } else {
                        ToastAndroid.show("Error en la validación", ToastAndroid.LONG);
                    }
                    return;
                }
                setSteps(1);
            }}>Continuar</Button>
            <Button mode="text" onPress={() => {
                navigation.navigate('Login' as never);
            }}>Ya tengo una cuenta</Button>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        padding: 16,
    },
    input: {
        marginBottom: 12,
    },
})