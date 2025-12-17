import React from 'react'
import { CameraView, useCameraPermissions } from 'expo-camera';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { AppContext } from '@/context/app';
import { baasAdapter } from '@/adapters/baas';
export const Verify = () => {
    const { setLoading,cuartel } = React.useContext(AppContext);
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = React.useRef<CameraView>(null);
    if (!permission) {
        return <View />;
    }
    if (!permission.granted) {

        return (
            <View style={styles.container}>
                <Text style={styles.message}>Necesitamos tu permiso para mostrar la cámara</Text>
                <Button mode="contained" onPress={requestPermission} >Conceder permiso</Button>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={'back'}
                ref={cameraRef}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={async (e) => {
                    cameraRef.current?.pausePreview();
                    setLoading(true);

                    try {
                        let data;
                        try {
                            data = JSON.parse(atob(e.data));
                        } catch {
                            throw new Error("QR NO VALIDO");
                        }
                        await baasAdapter.verify(data,cuartel);
                        setLoading({
                            icon: 'Task complete tick',
                            loading: true,
                            timeout: 2000,
                            options: {
                                loop: false,
                            }
                        });
                        console.log("Document status updated successfully.");

                    } catch (error) {
                        ToastAndroid.show((error instanceof Error ? error.message : 'Error desconocido'), ToastAndroid.LONG);
                        setLoading({
                            icon: 'Failure error icon',
                            loading: true,
                            timeout: 2000,
                            options: {
                                loop: false,
                            }
                        });
                    }
                    cameraRef.current?.resumePreview();
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 36,

    },
    message: {
        textAlign: 'center',

    },
    camera: {
        flex: 1,
    },
})

