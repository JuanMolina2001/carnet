import React from 'react'
import { View, StyleSheet, ToastAndroid} from 'react-native'
import { TextInput, Button} from 'react-native-paper';
import { validateCredentials } from './validations';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RegisterContext } from './context';

type Props = NativeStackScreenProps<RegisterStackParamList, 'Step2'>;
export const Step2 = ({ navigation }: Props) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
    } = React.useContext(RegisterContext);
  
    return (
        <View style={styles.container}>
            <TextInput label="Email" style={styles.input} value={email} onChangeText={setEmail} />
            <TextInput label="Contraseña" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
            <TextInput label="Confirmar Contraseña" style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
            <Button mode="contained" onPress={() => {
                try {
                    validateCredentials({email, password,  confirmPassword});
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
                navigation.navigate('Biometrics');
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