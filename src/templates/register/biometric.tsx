import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React from 'react';
import { Button, StyleSheet, Text,  View, } from 'react-native';
import { imageComparison } from '@/utils/biometrics';
import { RegisterContext } from '@/context/register';
import { AppContext } from '@/context/app';
import { IconButton } from 'react-native-paper';
export const Biometric = () => {
  const { handleLogin, setBiometricScreen } = React.useContext(RegisterContext);
  const [permission, requestPermission] = useCameraPermissions();
  const [firstPicture, setFirstPicture] = React.useState<Base64URLString | null>(null);
  const cameraRef = React.useRef<CameraView>(null);
  const { setLoading } = React.useContext(AppContext);

  React.useEffect(() => {
    setBiometricScreen(true);
    return () => {
      setBiometricScreen(false);
    }
  }, [])
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
    let icon: LoadingIcon = 'Scan';
    if (cameraRef.current) {
      setLoading({
        loading: true,
        icon: icon,
        timeout: firstPicture ? undefined : 1500,
      });
      const photo = await cameraRef.current.takePictureAsync({
        shutterSound: false,
        base64: true

      });
      if (firstPicture && photo.base64) {
        try {
          const result = await imageComparison(firstPicture, photo.base64);
          setFirstPicture(null)
          if (result.samePerson) {
            await handleLogin();
            icon = 'Task complete tick';
          } else {
            icon = 'Failure error icon';
            setFirstPicture(null)
          }
        } catch (error) {
          icon = 'Failure error icon';
          setFirstPicture(null)
        }
      } else {
        photo.base64 && setFirstPicture(photo.base64);
      }
      setLoading({
        loading: true,
        icon: icon,
        timeout: 1500,
      });
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={{
        width: firstPicture ? '75%' : '50%',
        height: firstPicture ? '75%' : '50%',
        borderRadius: 100
      }} facing={'front'} ref={cameraRef} />
      <View style={styles.buttonContainer}>
        <IconButton style={styles.button}
          size={48}
          onPress={takePicture}
          icon="camera" />
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
    flexDirection: 'row',
    paddingHorizontal: 64,

    marginTop: 32,


  },
  button: {
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',

  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
