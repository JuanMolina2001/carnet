import React from 'react'
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import WebView from 'react-native-webview';
import { LostDocContext } from '@/context/LostDoc';
export const Carnet = () => {

    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = React.useRef<CameraView>(null);
    const [url, setUrl] = React.useState<string | null>(null);
    const {addDocument} = React.useContext(LostDocContext);
    const injectedJS = `
(function () {
  const originalFetch = window.fetch;
  window.fetch = function (...args) {
    return originalFetch.apply(this, args).then(async (response) => {
      const clone = response.clone();
      let body = '';
      try { body = await clone.text(); } catch (e) {}
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'fetch',
        url: args[0],
        status: response.status,
        body
      }));
      return response;
    });
  };

  const originalXHROpen = XMLHttpRequest.prototype.open;
  const originalXHRSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (method, url) {
    this._url = url;
    return originalXHROpen.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function () {
    this.addEventListener('load', function () {
    if (this._url === '/usarios-api/validity') {

      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'xhr',
        url: this._url,
        status: this.status,
        response: this.responseText
      }));
    }
    });
    return originalXHRSend.apply(this, arguments);
  };
})();
`;
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
                <WebView
                    source={{ uri: url }}
                    injectedJavaScript={injectedJS}
                    onMessage={(event) => {
                        const data = JSON.parse(event.nativeEvent.data);
                        console.log("Interceptado:", data);
                        
                    }}
                />
            ) : (
                <CameraView
                    style={styles.camera}
                    facing={'back'}
                    ref={cameraRef}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr"],
                    }}
                    onBarcodeScanned={(e) => {
                        const data = e.data;
                        if (data.includes('registrocivil')) {
                            console.log('QR escaneado:', data);
                            cameraRef.current?.pausePreview();
                            setUrl(data);
                        }
                    }}
                />)}
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

