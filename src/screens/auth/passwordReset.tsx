import React from 'react'

import { Image, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { ToastAndroid } from 'react-native';
import { formatRut } from 'rutlib';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppContext } from '@/context/app';
import { baasAdapter } from '@/adapters/baas';
type Props = NativeStackScreenProps<AuthStackParamList, 'PasswordReset'>;

export const PasswordReset = ({ navigation }: Props) => {
    const { setLoading } = React.useContext(AppContext);
    const [localRut, setLocalRut] = React.useState<string>("");
    return (
         <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}>
            <Image
                style={{
                    height: 150,
                    width: 300,
                    alignSelf: 'center',
                    marginBottom: 24,
                }}
                source={require('../../../assets/images/password.png')}
            />
            <TextInput label="Rut" style={styles.input} value={localRut} onChangeText={async (e) => {
                setLocalRut(formatRut(e));

            }} />
            <Button mode="contained" onPress={async () => {
                setLoading(true);
                try {
                   baasAdapter.resetPassword(localRut);
                    navigation.getParent()?.navigate('MailConfirm');
                } catch (error: any) {
                    console.error("Error al restablecer la contraseña:", error);
                    ToastAndroid.show(`Error al restablecer la contraseña: ${error.message}`, ToastAndroid.LONG);
                } finally {
                    setLoading(false);
                }
            }}>Restablecer Contraseña</Button>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'white',
    },
    input: {
        marginBottom: 12,
    },
})