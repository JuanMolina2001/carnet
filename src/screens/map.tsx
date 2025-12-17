import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { ToastAndroid } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Cuartel } from '@/components/cuartel';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppContext } from '@/context/app';
type Props = NativeStackScreenProps<RootStackParamList, 'Map'>;

export const Map: React.FC<Props> = ({ route }) => {
    const { cuartel_id } = route.params;
    console.log({ cuartel_id });
    const { cuarteles, setLoading } = React.useContext(AppContext);
    const [currentLocation, setCurrentLocation] = React.useState<Location.LocationObject | null>(null);
    const mapRef = React.useRef<MapView | null>(null);
    const cuartel = cuartel_id ? (cuarteles as Cuartel[]).find((c) => c.properties.id === cuartel_id) : null;
    const getLocation = async () => {
        setLoading({ loading: true, icon: 'Bouncy Mapmaker' });

        const location = await Location.getCurrentPositionAsync({});
        setLoading(false);
        return location;
    }
    React.useEffect(() => {
        (async () => {

            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                ToastAndroid.show("Location permission denied", ToastAndroid.LONG);
                return;
            }
            let location
            if (cuartel) {
                setLoading(false);
                location = {
                    coords: {
                        latitude: cuartel.geometry.coordinates[1],
                        longitude: cuartel.geometry.coordinates[0],
                        altitude: 0,
                        accuracy: 0,
                        heading: 0,
                        speed: 0,
                    },
                    timestamp: Date.now(),
                } as Location.LocationObject;
            } else {
                location = await getLocation();
            }
            setCurrentLocation(location);

        })();
    }, []);
    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
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
                {cuartel_id ? <>
                    <Cuartel
                        comisaria={cuartel!}
                    />
                </> : (cuarteles as Cuartel[]).map((c, index) => {
                    if (!currentLocation) return null
                    if (Math.abs(currentLocation?.coords.latitude - c.properties.lat) > 0.2 || Math.abs(currentLocation?.coords.longitude - c.properties.lon) > 0.2) return null
                    return <Cuartel
                        comisaria={c}
                        key={index}
                    />
                })}
            </MapView>
            {!cuartel && <IconButton style={{
                position: 'absolute',
                bottom: 60,
                right: 10,
            }}
                icon="crosshairs-gps"
                mode="contained" onPress={async () => {
                    const location = await getLocation();
                    mapRef.current?.animateToRegion({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }, 1000);
                }}>

            </IconButton>}
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
