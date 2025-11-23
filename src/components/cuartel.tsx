import React from 'react'
import { Image, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { LostDocContext } from '@/context/LostDoc';
import { LocationObject } from 'expo-location';
export const Cuartel: React.FC<{ comisaria: Cuartel, location :LocationObject | null }> = ({ comisaria, location }) => {
    if (!location) {
        return null;
    }
    if (Math.abs(location.coords.latitude - comisaria.latitude) > 0.2 || Math.abs(location.coords.longitude - comisaria.longitude) > 0.2) {
        return null;
    }
    const {setCuartel}= React.useContext(LostDocContext)
    return (

        <Marker
            coordinate={{
                latitude: comisaria.latitude,
                longitude: comisaria.longitude,
            }}
            title={comisaria.nombre}
            onPress={() => {
                setCuartel(comisaria)
            }}
        >
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={require('../../assets/police.png')}
                    style={{ width: 40, height: 40 }}
                    resizeMode="contain"
                />
            </View>
        </Marker>
    )
}

