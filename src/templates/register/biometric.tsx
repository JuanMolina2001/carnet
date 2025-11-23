import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { imageComparison } from '@/utils/biometrics';
import { Loading } from '@/components/loading';
export const Biometric = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [firstPicture, setFirstPicture] = React.useState<Base64URLString | null>(null);
  const cameraRef = React.useRef<CameraView>(null);
  const [cameraSize, setCameraSize] = React.useState<ViewStyle>({
    width: '50%',
    height: '50%'
  })
  const [visible,setVisible] = React.useState<boolean>(false);
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      setVisible(true)
      const photo = await cameraRef.current.takePictureAsync({
        shutterSound: false,
        base64: true
      });
      if (firstPicture) {
        try {
          const result = await imageComparison({
            image1Base64: firstPicture,
            image2Base64: photo.base64
          });
          setVisible(false)
          setFirstPicture(null)
          alert(result.samePerson ? 'Same person' : 'Different persons');
        } catch (error) {
          setFirstPicture(null)
          console.log(error)
        }
        return;
      }
      photo.base64 && setFirstPicture(photo.base64);
      setCameraSize({
        width: '75%',
        height: '75%'
      })
      setTimeout(()=>{setVisible(false)},1000)
    }
  }

  return (
    <View style={styles.container}>
      <Loading visible={visible} />
      <CameraView style={{
        ...cameraSize,
        borderRadius: 100
      }} facing={'front'} ref={cameraRef} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.text}>Take Picture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
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
