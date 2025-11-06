import React from 'react'
import { Image, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { DocContext } from '../Context';
export const Cuartel: React.FC<{ comisaria: Cuartel }> = ({ comisaria}) => {
    const {setCuartel}= React.useContext(DocContext)
    return (

        <Marker
            coordinate={{
                latitude: comisaria.latitude,
                longitude: comisaria.longitude,
            }}
            title={comisaria.unidad_nombre}
            onPress={() => {
                setCuartel(comisaria)
            }}
        >
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={require('../../../../assets/police.png')}
                    style={{ width: 40, height: 40 }}
                    resizeMode="contain"
                />
            </View>
        </Marker>
    )
}

