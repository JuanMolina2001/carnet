import React from 'react'
import { View, StyleSheet, ToastAndroid } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { validateCredentials } from './validations';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RegisterContext } from '@/context/register'


type Props = NativeStackScreenProps<RegisterStackParamList, 'Step2'>;
export const Step2 = ({ navigation }: Props) => {
    const { userData, setUserData } = React.useContext(RegisterContext);

    return (
        <View style={styles.container}>
            <TextInput label="Email" style={styles.input} value={userData.email} onChangeText={(text) => setUserData({ ...userData, email: text })} />
            <TextInput label="Contraseña" style={styles.input} value={userData.password} onChangeText={(text) => setUserData({ ...userData, password: text })} secureTextEntry />
            <TextInput label="Confirmar Contraseña" style={styles.input} value={userData.confirmPassword} onChangeText={(text) => setUserData({ ...userData, confirmPassword: text })} secureTextEntry />
            <Button mode="contained" onPress={() => {
                try {
                    validateCredentials(userData, 2);
                    navigation.navigate('Biometrics');
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        ToastAndroid.show(error.message || "Error en la validación", ToastAndroid.LONG);
                    } else {
                        ToastAndroid.show("Error en la validación", ToastAndroid.LONG);
                    }
                    return;
                }

            }}>Continuar</Button>

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