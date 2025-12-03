import React from 'react'
import { Button, Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions, } from 'expo-camera'
import { useEffect, useState } from 'react'
import { PRODUCTS } from '../data/database'



const OPENAPI_API_KEY = ''

function ScanScreen() {
	const navigation = useNavigation<any>();
	const [showCamera, setShowCamera] = useState(true)
	const [facing, setFacing] = useState<CameraType>('back')
	const [permission, requestPermission] = useCameraPermissions()
	const [barCode, setBarCode] = useState<BarcodeScanningResult | null>(null) 
	const [lastBarCode, setLastBarCode] = useState<BarcodeScanningResult | null>(null);
	const [scanningActive, setScanningActive] = useState(true)

	const [X, setX] = useState<number | undefined>(0)
	const [Y, setY] = useState<number | undefined>(0)
	const [height, setHeight] = useState<number | undefined>(0)
	const [width, setWidth] = useState<number | undefined>(0)
	const [cameraLayout, setCameraLayout] = useState<any>(0)
	const [chronic_condition, setChronicCondition] = useState<any>('')
	const [safetyResult, setSafetyResult] = useState<SafetyResult | null>({safe: 'Checking', allergensFound: []});
	
	const [scannedProduct, setScannedProduct] = useState<any>(null);
	const [modalVisible, setModalVisible] = useState(false);

	type SafetyResult = {
	safe: 'Safe' | 'Not Safe' | 'Checking';
	allergensFound: string[];
	};

	// Product Information
	const [productInfo, setProductInfo] = useState<{
		name: string;
		ingredients: string;
		safetyStatus: 'safe' | 'not safe' | 'checking' | null;
	} | null>(null)


	// reset last barcode
	useEffect(() => {
		if (!lastBarCode) return; // no barcode, nothing to reset

		const timer = setTimeout(() => {
		setLastBarCode(null);
		console.log("Last barcode reset");
		}, 2000); // 2 seconds

		return () => clearTimeout(timer); // cleanup on new scan or unmount
	}, [lastBarCode]);

	// rescan after 5 seconds if product is found
	useEffect(() => {
		if (scanningActive) return; // only when scanning is disabled

		const timer = setTimeout(() => {
		setScanningActive(true);
		console.log("Scanning Active Again");
		}, 5000); // 5 seconds

		return () => clearTimeout(timer); // cleanup on new scan or unmount
	}, [lastBarCode]);

	useFocusEffect(
	React.useCallback(() => {
		setShowCamera(true);
		setScanningActive(true);
		console.log("Camera focused")
		return () => {
		setShowCamera(false);
		setScanningActive(false);
		console.log("Camera unfocused")
		};
	}, [])
	);

	// Overlay
	const {width: screenWidth, height: screenHeight} = Dimensions.get('window')
	// window width
	const windowWidth = screenWidth * 0.7;
	const windowHeight = screenHeight * 0.25;

	// Requesting permission
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

	// Helper funciton to get ingredients
	async function fetchProductData(barcode: string) {
    try {
      const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const json = await res.json();

      if (json.status === 1) {
        const product = json.product;
        const name = product.product_name || 'Unknown Product';
        const ingredients = product.ingredients_text || 'No ingredients data';
        const image = product.image_front_url || null;
		console.log(name)
		console.log(json)
        return { name, ingredients, image };
      } else {
        return null;
      }
    } catch (error) {
      console.error('OpenFoodFacts fetch error:', error);
      return null;
    }
  	}

	// Send ingredients to backend
	function fetchSafetyFunction(ingredients: string | string[], chronic_condition:any): SafetyResult {

		// Convert ingredients to a normalized string
		const ingString = Array.isArray(ingredients)
			? ingredients.join(" ").toLowerCase()
			: ingredients.toLowerCase();

		// Common gluten sources
		const chronic_conditions = {

		}
		const glutenKeywords = [
			"wheat",
			"barley",
			"rye",
			"triticale",
			"malt",
			"brewer's yeast",
			"oats", 
			"gluten" // some oats can be gluten-free, but we flag them for safety
		];

		// Check which allergens appear
		const allergensFound = glutenKeywords.filter((word) =>
			ingString.includes(word)
		);

		return {
			safe: allergensFound.length === 0 ? 'Safe' : 'Not Safe',
			allergensFound
		};
	}

	// Detected Barcode, get ingredients and send request to backend
	async function onDetectBarcode(scanningResult:BarcodeScanningResult) {
		if (!scanningActive) return; // disable scanning once product is found

		if (scanningResult.data == lastBarCode?.data) {
			return;
		} 

		setBarCode(scanningResult)
		setLastBarCode(scanningResult)
		console.log("📸 Camera size:", cameraLayout);
		console.log("🔲 Barcode bounds:", scanningResult.bounds);

		// Check local DB first
		const localProduct = PRODUCTS.find(p => p.qrCode === scanningResult.data);
		if (localProduct) {
			setScanningActive(false);
			navigation.navigate('IndividualProductView', { productId: localProduct.id });
			return;
		}

		const product = await fetchProductData(scanningResult.data);
		if (product) {
			// Calculate safety for API product
			const safetyCheck = fetchSafetyFunction(product.ingredients, []);
			
			const apiProduct = {
				id: 'api_' + scanningResult.data,
				name: product.name,
				image: product.image ? { uri: product.image } : require('../../assets/images/welcome.png'),
				quantity: 'Unknown',
				categories: ['General'],
				qrCode: scanningResult.data,
				score: safetyCheck.safe === 'Not Safe' ? 20 : 80,
				scoreLabel: 'Not Safe',
				scoreColor: '#FF0000',
				verdict: 'Safe to eat only at minimum quantities',
    			eatingInstructions: ['Consume maximum twice per day', 'Wait 3 hours before next consumption', 'Only eat after eating fruits'],
				nutrients: [
				{ name: 'Processing Level', level: 'Ultra-processed Food', value: '', color: '#FF0000' },
				{ name: 'Saturated Fat', level: 'High Fat', value: '6.2g', color: '#FFD580' },
				{ name: 'Sodium', level: 'High Salt', value: '510mg', color: '#FFD580' },
				],
				description: product.ingredients // Use description to show ingredients
			};

			setScanningActive(false);
			navigation.navigate('IndividualProductView', { product: apiProduct });
		} else {
			// Product not found in API either
			const notFoundProduct = {
				id: 'not_found',
				name: 'Product Not Found',
				image: require('../../assets/images/welcome.png'),
				quantity: '-',
				categories: [],
				qrCode: scanningResult.data,
				score: 0,
				scoreLabel: 'Unknown',
				scoreColor: '#ccc',
				verdict: 'This product is not in our database or OpenFoodFacts.',
				eatingInstructions: [],
				nutrients: []
			};
			setScanningActive(false);
			navigation.navigate('IndividualProductView', { product: notFoundProduct });
		}
	}


	return (
	<>	
	<View style={styles.parentContainer}>
		<StatusBar
			backgroundColor="black"
			barStyle="dark-content"
		/>
        {showCamera ? (
			<>
			{/*Camera View*/}
			<CameraView 
			onLayout={(event) => {
			const { width, height } = event.nativeEvent.layout;
			setCameraLayout({ width, height });
			}}
			style={StyleSheet.absoluteFillObject} facing={facing} autofocus='on' barcodeScannerSettings={{
			barcodeTypes: ['ean13','upc_a','ean8','aztec','code39','aztec','ean13','ean8','pdf417','upc_e','datamatrix','code39','code93','itf14','codabar','code128','upc_a'], 
			}} onBarcodeScanned={onDetectBarcode} >
			</CameraView>
			{/* Overlay */}
			<View style={styles.overlay}>
				{/* Top section */}
				<View style={[styles.overlayPart, { flex: 1, height: (screenHeight-windowHeight) / 2, width: screenWidth}]} />

				{/* Middle section: left - hole - right */}
				<View style={{ flexDirection: 'row' }}>
					<View style={[styles.overlayPart, { width: (screenHeight-windowWidth) / 2 }]} />
					<View style={[styles.scannerWindow, { width: windowWidth, height: windowHeight}]} />
					<View style={[styles.overlayPart, { width: (screenHeight-windowWidth) / 2 }]} />
				</View>

				{/* Bottom section */}
				<View style={[styles.overlayPart, { flex: 1, height: (screenHeight-windowHeight) / 2, width: screenWidth}]} />
    		</View>

			</>
        ) : ('')
        }

    </View>
	</>

  )
}


const styles = StyleSheet.create({
	hidden: {display: "none"},
	parentContainer: {
		flex: 1,
		alignItems: "center",
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
		minHeight: '100%',
		minWidth: '100%',
		justifyContent: 'center',
	},
	rectangleOverlay: {
		position: 'absolute',
		top: '0%',
		left: '0%',
		borderWidth: 2,
		borderColor: 'black',
		borderRadius: 8,
		margin: 8,
		height: 150,
		width: 300 
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center', // dark transparent overlay
	},
	overlayPart: {
		backgroundColor: 'rgba(0, 0, 0, 0.51)', // dark transparent overlay
	},
	scannerWindow: {
	},
    popupContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingVertical: 40,
        paddingHorizontal: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    resultLabel: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 6,
        color: '#333',
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 25,
        color: '#000',
		textAlign: 'center',
    },
    safeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkmark: {
        fontSize: 48,
        color: '#59df00',  // bright green
        marginRight: 12,
        fontWeight: 'bold',
    },
    safeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#59df00',
		width: '80%',
		textAlign: 'center'
    },
})

export default ScanScreen;