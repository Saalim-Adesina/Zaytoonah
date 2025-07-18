import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'
import { useState } from 'react'

export default function Scan() {
  const [facing, setFacing] = useState<CameraType>('back')
  const [permission, setPermission] = useCameraPermissions()

  if (!permission) {return <View />}
  if (!permission.granted) {
  // Camera permissions are not granted yet.
  return (
    <View>
      <Text>We need your permission to show the camera</Text>
      <Button title="grant permission" />
    </View>
  );
}
  
  return (
    <SafeAreaView>
    <View>
      <Text>Scan app</Text>
      <Link href='/' asChild>
        <TouchableOpacity>
          <Text style={styles.button}>Go Home</Text>
        </TouchableOpacity>
      </Link>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#022e00ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    color: '#ffffff'
  }
})