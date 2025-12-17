import React from 'react'
import { View, StyleSheet, ToastAndroid, KeyboardAvoidingView, Platform } from 'react-native'
import { TextInput, Button, Checkbox, HelperText } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RegisterContext } from '@/context/register'


type Props = NativeStackScreenProps<RegisterStackParamList, 'Step2'>;
export const Step2 = ({ navigation }: Props) => {
    const [checked, setChecked] = React.useState(false);
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const {
        userData,
        setUserData
    } = React.useContext(RegisterContext);
    const { email, password, confirmPassword } = userData;
    const [errors, setErrors] = React.useState<{ [key: string]: boolean }>({
        'email': false,
        'password': false,
        'confirmPassword': false,
        'terms': false
    });
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <TextInput label="Email" error={errors.email} style={styles.input} value={userData.email} onChangeText={(text) => setUserData({ ...userData, email: text })} />
            <HelperText style={{ display: errors.email ? 'flex' : 'none' }} type="error" visible>Por favor ingrese un correo electrónico válido.</HelperText>
            <TextInput label="Contraseña" error={errors.password} style={styles.input} value={userData.password} onChangeText={(text) => setUserData({ ...userData, password: text })} secureTextEntry={!passwordVisible}
                right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"}
                    onPress={() => setPasswordVisible(!passwordVisible)} />}
            />
            <HelperText style={{ display: errors.password ? 'flex' : 'none' }} type="error" visible>La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y números, y no contener espacios.</HelperText>
            <TextInput label="Confirmar Contraseña" error={errors.confirmPassword} style={styles.input} value={userData.confirmPassword} onChangeText={(text) => setUserData({ ...userData, confirmPassword: text })} secureTextEntry />
            <HelperText style={{ display: errors.confirmPassword ? 'flex' : 'none' }} type="error" visible>Las contraseñas no coinciden.</HelperText>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 16,
                borderColor: errors.terms ? '#f00000ff' : 'transparent',
                backgroundColor: errors.terms ? '#ff000022' : 'transparent',
                borderWidth: 1
            }}>
                <Checkbox

                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                />
                <Button onPress={() => {
                    navigation.getParent()?.navigate('TermsNconditions');
                }} style={{ flex: 1 }}>Acepto términos y condiciones</Button>
            </View>
            <HelperText style={{ display: errors.terms ? 'flex' : 'none' }} type="error" visible={errors.terms}>Debe aceptar los términos y condiciones.</HelperText>

            <Button mode="contained" onPress={() => {
                let valid = true;
                const newErrors = {
                    email: false,
                    password: false,
                    confirmPassword: false,
                    terms: false
                };
                !email && (newErrors.email = true, valid = false);
                !password && (newErrors.password = true, valid = false);
                !checked && (newErrors.terms = true, valid = false);
                (password !== confirmPassword) && (newErrors.confirmPassword = true, valid = false);
                if (password) {
                    const minLength = 8;
                    const hasUpper = /[A-Z]/.test(password);
                    const hasLower = /[a-z]/.test(password);
                    const hasNumber = /[0-9]/.test(password);
                    const noSpaces = !/\s/.test(password);

                    if (password.length < minLength) {
                        newErrors.password = true;
                        valid = false;
                    }
                    if (!hasUpper || !hasLower || !hasNumber) {
                        newErrors.password = true;
                        valid = false;
                    }
                    if (!noSpaces) {
                        newErrors.password = true;
                        valid = false;
                    }
                }
                if (email) {
                    const emailTrim = email.trim();
                    const atCount = (emailTrim.match(/@/g) || []).length;
                    const [localPart, domainPart] = emailTrim.split('@');
                    if (/\s/.test(emailTrim) || atCount !== 1 || !localPart || !domainPart || localPart.startsWith('.') || localPart.endsWith('.') || /\.\./.test(localPart)) {
                        newErrors.email = true;
                        valid = false;
                    }
                }
                console.log(newErrors);
                setErrors(newErrors);
                valid && navigation.navigate('Biometric');

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