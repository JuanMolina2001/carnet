import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { ToastAndroid } from 'react-native';
import { GeoApi } from './geoApi';
import { Button } from 'react-native-paper';

export const Map = () => {
    const [location, setLocation] = React.useState<Location.LocationObject | null>(null);
    const [comisarias, setComisarias] = React.useState<Cuarteles[]>([]);
    const [display, setDisplay] = React.useState<'none' | 'flex'>('none');
    React.useEffect(() => {
        (async () => {
            
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                ToastAndroid.show("Location permission denied", ToastAndroid.LONG);
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            const geoApi = new GeoApi();
            const comisarias = await geoApi.getNearbyPoliceStations(location.coords.latitude, location.coords.longitude);
            console.log(comisarias);
            setComisarias(comisarias);
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
                    latitude: location?.coords.latitude || 0,
                    longitude: location?.coords.longitude || 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,

                }}>
                {comisarias.map((comisaria, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: comisaria.latitude,
                            longitude: comisaria.longitude,
                        }}
                        title={comisaria.unidad_nombre}
                        onPress={() => {
                            setDisplay('flex');
                        }}
                    >
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={require('../../../assets/police.png')}
                                style={{ width: 40, height: 40 }}  
                                resizeMode="contain"
                            />
                        </View>
                    </Marker>
                ))}
            </MapView>
            <View style={{ position: 'absolute', bottom: 40, left: 0, right: 0, alignItems: 'center' ,display:display,width:'100%',backgroundColor:'white',padding:16}}>
                <Button mode="contained" onPress={() => {}}>Continuar</Button>
                <Button mode="text" onPress={() => { setDisplay('none'); }}>Cancelar</Button>
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
