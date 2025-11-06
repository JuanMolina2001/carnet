import React from 'react'
import { Text, View, StyleSheet, ToastAndroid } from 'react-native'
import { auth } from '../../../firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { TextInput, Button, HelperText } from 'react-native-paper';
import { UserContext } from '../../userContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;
export const Login = ({ navigation }: Props) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const { user, setUser } = React.useContext(UserContext);
    const handleLogin = () => {

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
                navigation.navigate('Register');

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