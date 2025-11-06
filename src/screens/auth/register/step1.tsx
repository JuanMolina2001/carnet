import React from 'react'
import { Text, View, StyleSheet, ToastAndroid, KeyboardAvoidingView, Platform } from 'react-native'
import { TextInput, Button} from 'react-native-paper';
import { formatRut } from 'rutlib'
import { validateCredentials } from './validations';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RegisterContext } from './context';

type Props = NativeStackScreenProps<RegisterStackParamList, 'Step1'>;
export const Step1 = ({ navigation }: Props) => {
    const {
        rut,
        setRut,
        name,
        setName,
        lastName,
        setLastName
    } = React.useContext(RegisterContext);
    
    return (
        <View style={styles.container}>
            <TextInput label="Nombres" style={styles.input} value={name} onChangeText={setName} />
            <TextInput label="Apellidos" style={styles.input} value={lastName} onChangeText={setLastName} />
            <TextInput label="RUT" style={styles.input} value={rut} onChangeText={(t) => { setRut(formatRut(t)) }} />
            <Button mode="contained" onPress={() => {
                try {
                    validateCredentials({ rut, name, lastName});
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        ToastAndroid.show(error.message || "Error en la validación", ToastAndroid.LONG);
                    } else {
                        ToastAndroid.show("Error en la validación", ToastAndroid.LONG);
                    }
                    return;
                }

            }}>Continuar</Button>
            <Button mode="text" onPress={() => {
                navigation.navigate('Step2');
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