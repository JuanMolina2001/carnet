import * as faceapi from 'face-api.js'
import * as canvas from 'canvas'
import React from 'react'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export const Biometric: React.FC = () => {
  // const { Canvas, Image, ImageData } = canvas
  // const [permission, requestPermission] = useCameraPermissions();
  // const cameraRef = React.useRef<CameraView>(null);
  // const [modelsLoaded, setModelsLoaded] = useState(false);
  // //@ts-ignore
  // faceapi.env.monkeyPatch({ Canvas, Image, ImageData })
  // React.useEffect(() => {
  //   (async () => {
  //     const MODEL_URL = 'assets/models'
  //     console.log(MODEL_URL)
  //     await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL)
  //     await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL)
  //     await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL)
  //     setModelsLoaded(true);
  //   })()
  // }, []);


  // if (!permission) {
  //   // Camera permissions are still loading.
  //   return <View />;
  // }

  // if (!permission.granted) {
  //   // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={()=>{}} title="grant permission" />
      </View>
    );
  // }
  // return (
  //   <View style={styles.container}>
  //     <CameraView style={styles.camera} facing={'front'} ref={cameraRef} />
  //     <View style={styles.buttonContainer}>
  //       <TouchableOpacity style={styles.button} onPress={async () => {
  //         if (!cameraRef.current || !modelsLoaded) return;
  //         const photo = await cameraRef.current.takePictureAsync({ skipProcessing: true });
  //         const img = await canvas.loadImage(photo.uri);
  //         const detections = await faceapi.detectAllFaces(img)
  //           .withFaceLandmarks()
  //           .withFaceDescriptors()

  //         console.log(detections)
  //       }}>
  //         <Text style={styles.text}>Flip Camera</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});