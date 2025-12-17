import React from 'react'
import { Image, View } from 'react-native';
import { Marker } from 'react-native-maps';
export const Cuartel: React.FC<{ 
    comisaria: Cuartel, 
    onPress?: () => void
 }> = ({ comisaria,onPress }) => {
    return (
        <Marker
            coordinate={{
                latitude: comisaria.properties.lat,
                longitude: comisaria.properties.lon,
            }}
            title={comisaria.properties.nombre}
            onPress={() => {
                if (onPress) {
                    onPress();
                }
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

