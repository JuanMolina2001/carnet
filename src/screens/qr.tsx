
import React from 'react'
import QRCode from 'react-native-qrcode-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { CryptoEncoding } from 'expo-crypto';
import { baasAdapter } from '@/adapters/baas';
import { AppContext } from '@/context/app';
type Props = NativeStackScreenProps<RootStackParamList, 'Qr'>;
export const Qr: React.FC<Props> = ({ route, navigation }) => {
    const { id_user, expectedStatus, docRef } = route.params;
    const { setLoading } = React.useContext(AppContext);
    React.useEffect(() => {
        const unsubscribe = baasAdapter.qrListener(docRef, expectedStatus, () => {
            setLoading({
                icon: 'Task complete tick',
                loading: true,
                timeout: 2000,
                options: {
                    loop: false,
                }
            });
            navigation.goBack();
        });
        return () => unsubscribe();

    }, [docRef, expectedStatus])
    return (
        <View style={{ flex: 1, alignItems: 'center', gap: 16, padding: 32 }}>
            <Text
                variant='headlineSmall'
                style={{
                    textAlign: 'center',
                    fontSize: 18
                }}>
                {id_user ? 'Dirigete a la comisaría más cercana para validar el documento.' : 'Muestra este código QR en la comisaría para reclamar tu documento.'}
            </Text>
            <Image
                source={require('../../assets/images/qr.png')}
                style={{ width: 150, height: 150, resizeMode: 'contain' }}
            />

            <QRCode
                size={250}
                value={btoa(JSON.stringify({ docRef, expectedStatus, id_user }))}
            />
            {id_user && <Button
                mode='contained'
                icon="map-marker"
                onPress={() => navigation.navigate('Map', { cuartel_id: undefined })
                } >
                Ver comisarías cercanas
            </Button>

            }
        </View>
    )
}
