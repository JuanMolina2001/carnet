import React from 'react'
import { Text, View, StyleSheet, ToastAndroid } from 'react-native'
import { auth, db } from '@/config/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { TextInput, Button, HelperText, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { UserContext } from '@/context/user';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { doc, getDoc } from 'firebase/firestore';
import * as Crypto from 'expo-crypto';
import { formatRut } from 'rutlib';
import { Loading } from '@/components/loading';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;
export const Login = ({ navigation }: Props) => {
    const { rut, setRut } = React.useContext(UserContext);
    const [localRut, setLocalRut] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const { user, setUser } = React.useContext(UserContext); 
    const [isLoading, setIsLoading] = React.useState(false);
    const handleLogin = async () => {
        setIsLoading(true);
        const hashRut = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            localRut
        );
        const snap = await getDoc(doc(db, "users", hashRut));
        if (!snap.exists()) {
            ToastAndroid.show("Usuario no encontrado", ToastAndroid.LONG);
            return;
        }

        const email = snap.data()?.email;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                ToastAndroid.show("Login successful", ToastAndroid.SHORT);
                setUser(user);
                setRut(hashRut);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                ToastAndroid.show(`Login failed: ${errorMessage}`, ToastAndroid.LONG);
                setIsLoading(false);
            });
    }
    return (
        <>
            <View style={styles.container}>
            <Loading visible={isLoading} />

                <TextInput label="Rut" style={styles.input} value={localRut} onChangeText={(e) => setLocalRut(formatRut(e))} />
                <TextInput label="Contraseña" secureTextEntry={!passwordVisible}
                    right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"}
                        onPress={() => setPasswordVisible(!passwordVisible)} />}
                    style={styles.input} value={password} onChangeText={setPassword} />
                <Button mode="contained" onPress={handleLogin}>Iniciar Sesión</Button>
                <Button mode="text" onPress={() => {
                    navigation.navigate('Register');

                }}>Registrarse</Button>
            </View>
        </>
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