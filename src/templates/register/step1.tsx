import React from 'react'
import { Text, View, StyleSheet, ToastAndroid, KeyboardAvoidingView, Platform } from 'react-native'
import { TextInput, Button, HelperText } from 'react-native-paper';
import { formatRut, validateRut } from 'rutlib'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RegisterContext } from '@/context/register'


type Props = NativeStackScreenProps<RegisterStackParamList, 'Step1'>;
export const Step1 = ({ navigation }: Props) => {
    const {
        userData,
        setUserData
    } = React.useContext(RegisterContext);
    const { name, lastName, rut } = userData;
    const [errors, setErrors] = React.useState<{ [key: string]: boolean }>({
        'name': false,
        'lastName': false,
        'rut': false,
    });
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <TextInput label="Nombres" error={errors.name} style={styles.input} value={userData.name} onChangeText={(text) => setUserData({ ...userData, name: text })} />
            <HelperText style={{ display: errors.name ? 'flex' : 'none' }} type="error" visible>Por favor ingrese su nombre.</HelperText>
            <TextInput label="Apellidos" error={errors.lastName} style={styles.input} value={userData.lastName} onChangeText={(text) => setUserData({ ...userData, lastName: text })} />
            <HelperText style={{ display: errors.lastName ? 'flex' : 'none' }} type="error" visible>Por favor ingrese sus apellidos.</HelperText>
            <TextInput label="RUT" error={errors.rut} style={styles.input} value={userData.rut} onChangeText={(text) => setUserData({ ...userData, rut: formatRut(text) })} />
            <HelperText style={{ display: errors.rut ? 'flex' : 'none' }} type="error" visible>Por favor ingrese un RUT válido.</HelperText>
            <Button mode="contained" onPress={() => {
                let valid = true;
                const newErrors = { name: false, lastName: false, rut: false };

                if (!name || name.trim().length === 0) {
                    newErrors.name = true;
                    valid = false;
                }

                if (!lastName || lastName.trim().length === 0) {
                    newErrors.lastName = true;
                    valid = false;
                }

                if (!rut || !validateRut(rut)) {
                    newErrors.rut = true;
                    valid = false;
                }
                setErrors(newErrors);
                valid && navigation.navigate('Step2');

            }}>Continuar</Button>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        marginBottom: 12,
    },
})