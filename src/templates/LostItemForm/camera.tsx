import { LostDocContext } from '@/context/LostDoc';
import { CameraView } from 'expo-camera';
import LottieView from 'lottie-react-native';
import React from 'react'
import { Button } from 'react-native-paper';

export const Camera: React.FC<{
    setUrl: (url: string) => void;
}> = ({
    setUrl,
}) => {
        const cameraRef = React.useRef<CameraView>(null);
        const { setProg } = React.useContext(LostDocContext);
        React.useEffect(() => {
            setProg(0.6);
            return () => {
                setProg(0.3);
            }
        }, []);
        return (
            <>
                <LottieView
                    source={require(`../../../assets/animations/Scan QR code of chilean identification card.json`)}
                    autoPlay
                    loop={false}
                    style={{
                        height: 200
                    }}

                />
                <CameraView
                    style={{
                        height: 200,
                        width: 200,
                        alignSelf: 'center'

                    }}
                    facing={'back'}
                    ref={cameraRef}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr"],
                    }}
                    ratio='1:1'
                    onBarcodeScanned={(e) => {
                        const data = e.data;
                        if (data.includes('registrocivil')) {
                            console.log('QR escaneado:', data);
                            cameraRef.current?.pausePreview();
                            setUrl(data);
                        }
                    }}
                />
                <Button
                    mode='contained'
                    style={{
                        margin: 10,
                        width: 200,
                        alignSelf: 'center'
                    }}
                    onPress={() => setUrl('https://portal.nuevosidiv.registrocivil.cl/document-validity')}>
                    Validar manualmente
                </Button>
            </>
        )
    }
