import React from 'react'
import { Text, View, StyleSheet, ToastAndroid, Image, KeyboardAvoidingView, Platform } from 'react-native'
import { TextInput, Button, Switch, SegmentedButtons } from 'react-native-paper';
import { AppContext } from '@/context/app';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { formatRut } from 'rutlib';
import { baasAdapter } from '@/adapters/baas';
type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;
export const Login = ({ navigation }: Props) => {
    const { rut, setRut, user, setUser, setLoading } = React.useContext(AppContext);
    const [localRut, setLocalRut] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [type, setType] = React.useState<'civil' | 'carabinero'>('civil');
    const [visible, setVisible] = React.useState(true);
    const handleLogin = async () => {
        setLoading(true);
        baasAdapter.login(localRut, password)
            .then(async ({ user, hashRut }) => {
                setUser(user);
                setRut(hashRut);
            })
            .catch((error) => {
                console.log("Login error:", error);
                ToastAndroid.show(`Error al iniciar sesión: ${error}`, ToastAndroid.LONG);
            }).finally(() => {
                setLoading(false);
            });
    }

    return (
            <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                >
                <View style={{ display: visible ? 'flex' : 'none' }}>
                    <View>
                        <Image
                            style={{
                                height: 150,
                                width: 300,
                                alignSelf: 'center',
                                marginBottom: 24,
                            }}
                            source={require('../../../assets/images/login.png')}
                        />
                    </View>
                    <SegmentedButtons
                        value={type}
                        buttons={[
                            { label: 'Usuario Civil', value: 'civil', },
                            { label: 'Carabinero', value: 'carabinero' },
                        ]}
                        onValueChange={setType}
                    />
                </View>
                
                    <TextInput label={
                        type === 'civil' ? 'Rut' : 'ID Carabinero'
                    } value={localRut} onChangeText={(e) => setLocalRut(type === 'civil' ? formatRut(e) : e)} />
                    <TextInput label="Contraseña" secureTextEntry={!passwordVisible}
                        right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        />}
                        value={password} onChangeText={setPassword} />
                    <Button mode="contained" onPress={handleLogin}>Iniciar Sesión</Button>
                    <Button mode="text" onPress={() => { navigation.navigate('Register'); }}> Registrarse</Button>
                    <Button mode="text" onPress={() => {
                        navigation.navigate('PasswordReset');
                    }}>
                        ¿Olvidaste tu contraseña?
                    </Button>
                </KeyboardAvoidingView>
        
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'white',
        gap: 12,
    },

})