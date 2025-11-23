import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { ToastAndroid } from 'react-native';
import cuarteles from '@/data/cuarteles.min.json';
import { Cuartel } from '@/components/cuartel';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<MyDocsStackParamList, 'Location'>;

export const Map: React.FC<Props> = ({ route }) => {
    const { cuartel_id } = route.params;
    const cuartel = (cuarteles as Cuartel[]).find((c) => c.id === cuartel_id);
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
                    latitude: cuartel?.latitude || 0,
                    longitude: cuartel?.longitude || 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    

                }}>
                {cuartel && <Cuartel location={currentLocation} comisaria={cuartel} />}
            </MapView>
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
