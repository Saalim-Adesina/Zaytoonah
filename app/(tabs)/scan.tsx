import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera'
import { useState } from 'react'


export default function Scan() {
  const [facing, setFacing] = useState<CameraType>('back')
  const [permission, requestPermission] = useCameraPermissions()

  if (!permission) {return <View />}
  if (!permission.granted) {
  // Camera permissions are not granted yet.
  return (
    <View>
      <Text>We need your permission to show the camera</Text>
      <Button title="grant permission" onPress={requestPermission} />
    </View>
  );
  }
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
  
  return (
    <SafeAreaView style={styles.parentContainer}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.rectangleOverlay}></View>
      </CameraView>
      <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
        <Text style={styles.buttonText}>Flip Camera</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    backgroundColor: '#0e8008ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '60%',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 10
  },
  buttonText: {
    color: '#ffffff',
  },
  cameraWrapper: {
    flex: 1
  },
  camera: {
    minHeight: '40%',
    minWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  rectangleOverlay: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    margin: 8,
    height: '40%',
    width: 300 
  }
})