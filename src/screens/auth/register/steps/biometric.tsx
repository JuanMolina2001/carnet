// import React from 'react'
// import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
// import { StyleSheet, View } from 'react-native';
// import { Text, Button } from 'react-native-paper';

// const Biometric:React.FC<{
//   onSuccess?:()=>void,
// }> = ({onSuccess}) => {
    
//     const [permission, requestPermission] = useCameraPermissions();
//     const cameraRef = React.useRef<CameraView>(null);

//     if (!permission) {
//         return <View />;
//     }
//     if (!permission.granted) {

//         return (
//             <View style={styles.container}>
//                 <Text style={styles.message}>Necesitamos tu permiso para mostrar la cámara</Text>
//                 <Button mode="contained" onPress={requestPermission} >Conceder permiso</Button>
//             </View>
//         );
//     }
//     return (
//         <View style={styles.container}>
//             <CameraView style={styles.camera} facing={'back'} ref={cameraRef}
    
//             />
//             <Button mode="contained" onPress={() => {
//                 if (cameraRef.current) {
//                     cameraRef.current.takePictureAsync().then(photo => {
//                        onSuccess && onSuccess();
                        
//                     }).catch(error => {
//                         console.error('Error al capturar la foto:', error);
//                     });
//                 }
//             }} >Capture</Button>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         paddingBottom: 36,

//     },
//     message: {
//         textAlign: 'center',
        
//     },
//     camera: {
//         flex: 1,
//     },
// })
// export default Biometric
import React from 'react'
import WebView from 'react-native-webview'
export const Biometric = () => {
  return (
    <WebView
      source={{ html: '<h1>Hello from WebView!</h1><p>This is custom HTML.</p>' }}
      style={{ flex: 1 }}
    />
  )
}
