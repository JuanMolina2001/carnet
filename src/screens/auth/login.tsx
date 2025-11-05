import React from 'react'
import { Text, View, StyleSheet, ToastAndroid } from 'react-native'
import { app } from '../../../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { TextInput, Button, HelperText } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../userContext';
export const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const navigation = useNavigation();
    const { user, setUser } = React.useContext(UserContext);
    const handleLogin = () => {
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                ToastAndroid.show("Login successful", ToastAndroid.SHORT);
                setUser(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                ToastAndroid.show(`Login failed: ${errorMessage}`, ToastAndroid.LONG);
            });
    }

    return (
        <View style={styles.container}>
            <TextInput label="Email" style={styles.input} value={email} onChangeText={setEmail} />
            <TextInput label="Contraseña" secureTextEntry={!passwordVisible}
                right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"}
                    onPress={() => setPasswordVisible(!passwordVisible)} />}
                style={styles.input} value={password} onChangeText={setPassword} />
            <Button mode="contained" onPress={handleLogin}>Iniciar Sesión</Button>
            <Button mode="text" onPress={() => {
                navigation.navigate('Register' as never);

            }}>Registrarse</Button>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        marginBottom: 12,
    },
})