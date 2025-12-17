import React from 'react'
import { useCameraPermissions } from 'expo-camera';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WebviewForm } from '@/templates/LostItemForm/webviewForm';
import { Camera } from '@/templates/LostItemForm/camera';
type Props = NativeStackScreenProps<DocumentStackParamList, 'Confirm'>;
export const Carnet = ({
    navigation
}: Props) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [url, setUrl] = React.useState<string | null>(null);


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
            {url ? (
                <WebviewForm url={url} navigation={navigation} />
            ) : (
                <Camera setUrl={setUrl}  />
            )}

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

})

