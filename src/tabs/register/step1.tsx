import React from 'react'
import { Text, View, StyleSheet, ToastAndroid, KeyboardAvoidingView, Platform } from 'react-native'
import { TextInput, Button} from 'react-native-paper';
import { formatRut } from 'rutlib'
import { validateCredentials } from './validations';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RegisterContext } from '@/context/register'


type Props = NativeStackScreenProps<RegisterStackParamList, 'Step1'>;
export const Step1 = ({ navigation }: Props) => {
    const {
     userData,
        setUserData
    } = React.useContext(RegisterContext);
    
    return (
        <View style={styles.container}>
            <TextInput label="Nombres" style={styles.input} value={userData.name} onChangeText={(text) => setUserData({ ...userData, name: text })} />
            <TextInput label="Apellidos" style={styles.input} value={userData.lastName} onChangeText={(text) => setUserData({ ...userData, lastName: text })} />
            <TextInput label="RUT" style={styles.input} value={userData.rut} onChangeText={(text) => setUserData({ ...userData, rut: formatRut(text) })} />
            <Button mode="contained" onPress={() => {
                try {
                    validateCredentials(userData, 1);
                    navigation.navigate('Step2');
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