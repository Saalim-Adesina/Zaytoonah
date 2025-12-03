import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from "expo-font";
import React from 'react';
import { Text } from "react-native";
import { UserProvider } from './src/context/userContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
	const [fontsLoaded] = useFonts({
		"Inter": require("./assets/fonts/Inter-VariableFont_opszwght.ttf")
	})
	if (!fontsLoaded) {
		return <>
		<Text>Font is still Loading</Text>
		</>
	}
  	return (
		<UserProvider>
			<NavigationContainer>
				<AppNavigator />
			</NavigationContainer>
		</UserProvider>
  	);
}




