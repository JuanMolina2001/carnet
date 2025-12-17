import { AppContext } from '@/context/app';
import { LostDocContext } from '@/context/LostDoc';
import React from 'react'
import WebView from 'react-native-webview';
import { formatRut } from 'rutlib';
import { baasAdapter } from '@/adapters/baas'
import { ToastAndroid } from 'react-native';
import * as Crypto from 'expo-crypto';
export const WebviewForm: React.FC<{
    navigation: any;
    url: string;
}> = ({
    navigation,
    url
}) => {

        const { typeDocument, setProg } = React.useContext(LostDocContext);
        React.useEffect(() => {
            setProg(0.9);
            return () => {
                setProg(0.3);
            }
        }, []);
        const { user, rut } = React.useContext(AppContext);
        const processingRef = React.useRef(false);
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
        return (
            <WebView
                source={{ uri: url }}
                injectedJavaScript={injectedJS}
                onMessage={async (event) => {
                    const data = JSON.parse(event.nativeEvent.data);
                    if (!rut) return;
                    try {
                        const response = JSON.parse(data.response);
                        const ownerRut = response.run;
                        if (processingRef.current) return;
                        if (response.state === 'VALID') {
                            processingRef.current = true;
                            const owner_id = await Crypto.digestStringAsync(
                                Crypto.CryptoDigestAlgorithm.SHA256,
                                formatRut(ownerRut)
                            );
                            const exists = await baasAdapter.documentExist('Carnet', owner_id);
                            if (exists) {
                                ToastAndroid.show("Ya existe un carnet registrado con este RUT", ToastAndroid.LONG);
                                navigation.pop(2);
                                return
                            }
                            await baasAdapter.addDocument({
                                owner_id,
                                data: {
                                    documentNumber: response.documentNumber.replace(/\d(?=\d{4})/g, '*'),
                                    state: response.state,
                                },
                                typeDocument,
                                user,
                                rut
                            });
                            navigation.pop(2);
                        }

                    } catch (error) {
                        console.log("Error parsing intercepted data:", error);
                        ToastAndroid.show("Error al validar el carnet", ToastAndroid.LONG);
                    }


                }
                }
            />
        )
    }
