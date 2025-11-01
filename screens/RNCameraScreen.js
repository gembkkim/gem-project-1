import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Button, Image } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";

function RNCameraScreen() {
  const camera = useRef(null);
  const device = useCameraDevice("back"); // 'front' 또는 'back'
  const [hasPermission, setHasPermission] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    async function requestPermission() {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === "authorized");
    }
    requestPermission();
  }, []);

  const takePicture = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto();
      setPhotoUri(photo.path);
    }
  };

  if (!hasPermission) {
    return (
      <View>
        <Text>권한이 필요합니다.</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View>
        <Text>카메라 장치를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!photoUri ? (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        />
      ) : (
        <Image source={{ uri: `file:///${photoUri}` }} style={styles.preview} />
      )}

      {photoUri ? (
        <Button title="닫기" onPress={() => setPhotoUri(null)} />
      ) : (
        <Button title="사진 찍기" onPress={takePicture} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default RNCameraScreen;
