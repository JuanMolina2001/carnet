import LottieView from 'lottie-react-native'
import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
type Props = NativeStackScreenProps<RootStackParamList, 'MailConfirm'>;

export const MailConfirm = ({ navigation }: Props) => {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}
        >
            <LottieView
                source={require('../../assets/animations/New Mail.json')}
                autoPlay
                loop
                style={{ width: 200, height: 200, alignSelf: 'center' }}
            />
            <Text variant="bodyLarge" style={{ textAlign: 'center', marginBottom: 16 }}>
                Se envio un correo de confirmación a su email. Por favor, revise su bandeja de entrada.
            </Text>
            <Button onPress={()=>{
                navigation.navigate('Home');
            }}>
                Volver
            </Button>
        </View>
    )
}
