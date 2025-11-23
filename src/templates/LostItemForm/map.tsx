import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { ToastAndroid } from 'react-native';
import cuarteles  from '@/data/cuarteles.min.json';
import { Button } from 'react-native-paper';
import { Cuartel } from '@/components/cuartel';
import { LostDocContext } from '@/context/LostDoc';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<DocumentStackParamList, 'Map'>;

export const Map = ({ navigation }: Props) => {


    const {cuartel,setCuartel} = React.useContext(LostDocContext)
    const [currentLocation, setCurrentLocation] = React.useState<Location.LocationObject | null>(null);
    React.useEffect(() => {
        (async () => {
            
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                ToastAndroid.show("Location permission denied", ToastAndroid.LONG);
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location);
        })();
    }, []);
    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                customMapStyle={[
                    {
                        featureType: "poi",
                        stylers: [{ visibility: "off" }]
                    },
                    {
                        featureType: "transit",
                        stylers: [{ visibility: "off" }]
                    },
                    {
                        featureType: "road",
                        elementType: "labels.icon",
                        stylers: [{ visibility: "off" }]
                    }
                ]}
                region={{
                    latitude: currentLocation?.coords.latitude || 0,
                    longitude: currentLocation?.coords.longitude || 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,

                }}>
                {(cuarteles as Cuartel[]).map((c, index) => (
                    <Cuartel location={currentLocation} comisaria={c} key={index}/>
                ))}
            </MapView>
            <View style={{ position: 'absolute', bottom: 40, left: 0, right: 0, alignItems: 'center' ,display:cuartel?'flex':'none',width:'100%',backgroundColor:'white',padding:16}}>
                <Button mode="contained" onPress={() => {
                    navigation.navigate('Confirm');
                }}>Continuar</Button>
                <Button mode="text" onPress={() => { setCuartel(null); }}>Cancelar</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
