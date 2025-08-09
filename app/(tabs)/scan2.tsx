import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    Dimensions 
} from 'react-native'
import { 
    CameraView, 
    CameraType, 
    useCameraPermissions, 
    Camera, 
    BarcodeBounds, 
    BarcodeScanningResult, 
    BarcodeSettings, 
    BarcodePoint, 
    BarcodeSize, 
    BarcodeType, 
    ScanningResult 
} from 'expo-camera'
import { useState, useRef } from 'react'

export default function scan2() {
    <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Scanner</Text>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
    },
    text: {
        color: 'black'
    }
})