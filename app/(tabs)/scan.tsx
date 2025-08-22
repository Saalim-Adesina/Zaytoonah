import {
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    Dimensions,
	StatusBar,
} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CameraView, CameraType, useCameraPermissions, Camera, BarcodeBounds, BarcodeScanningResult, BarcodeSettings, BarcodePoint, BarcodeSize, BarcodeType, ScanningResult } from 'expo-camera'
import { useState, useRef, useEffect } from 'react'
import allergens from '../../src/allergens'


const OPENAPI_API_KEY = ''


export default function Scan() {
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
		console.log(name)
        return { name, ingredients };
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

		const product = await fetchProductData(scanningResult.data);
		if (product) {
			setProductInfo({ name: product.name, ingredients: product.ingredients, safetyStatus: 'checking' });
			const safetyCheck = fetchSafetyFunction(product.ingredients, []) // TODO Add specific alergen  
			setSafetyResult(safetyCheck)
			setScanningActive(false) // disable scanning once product is found
		} else {
		setProductInfo({ name: 'Product Not Found', ingredients: '', safetyStatus: null });
		setSafetyResult({safe: 'Checking', allergensFound:[]})
		}
	}


	return (
	<>	
	<View style={styles.parentContainer}>
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
		
		{barCode && (
			<View style={styles.popupContainer}>
				<TouchableOpacity
				style={{ position: 'absolute', top: 20, right: 30, zIndex: 10 }}
				onPress={() => {
					setBarCode(null)
					setScanningActive(true) //allow scanning again
				}}
				>
					<Text style={{ fontSize: 24, fontWeight: 'bold' }}>✕</Text>
				</TouchableOpacity>
				<Text style={styles.resultLabel}>Scan Result: {barCode.data}</Text>
				<Text style={styles.productName}>{productInfo?.name}</Text>

				<View style={styles.safeContainer}>
					<Text style={styles.checkmark}>
						{safetyResult?.safe === 'Checking'
						? "⏳"
						: safetyResult?.safe === 'Safe'
						? "✅"
						: "❌"}
					</Text>
					<Text style={[
						styles.safeText,
						{
							color:
								safetyResult?.safe === 'Safe'
									? '#59df00'
									: safetyResult?.safe === 'Not Safe'
									? 'red'
									: '#333'
						}
					]}>
						{safetyResult?.safe === 'Safe' ? "This product is gluten free, enjoy!" : safetyResult?.safe === `Not Safe` ? `This product is not gluten free due to the following ingredients: ${safetyResult.allergensFound.join(', ')}` : 'Checking'}
					</Text>
					<Text></Text>
				</View>
			</View>
		) }

    </View>
	</>

  )
}


const styles = StyleSheet.create({
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