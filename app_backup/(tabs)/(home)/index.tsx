import { Link } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
               <StatusBar
           backgroundColor="black"
           barStyle="dark-content"
         />
      {/* Top decorative olives */}
      <Image
        source={require("../../../assets/images/left-character.png")}
        style={[styles.decorativeOlive, { top: -150, left: -10, height: '100%'}]}
      />
      <Image
        source={require("../../../assets/images/right-character.png")}
        style={[styles.decorativeOlive, { top: 10, right: -120, height: 200, width: '100%' }]}
      />

      {/* Center text */}
      <View style={styles.textContainer}>
        <Text style={styles.smallText}>Meet</Text>
        <Text style={styles.title}>Zaytoonah</Text>
        <Text style={styles.subtitle}>Your Healthy Eating Partner</Text>
      </View>

      {/* Mascot image */}
      <Image
        source={require("../../../assets/images/olive-character.png")}
        style={styles.character}
      />

      {/* Next button */}
      <Link href="/settings" asChild>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextText}>Next →</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f6d0",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 230,
  },
  smallText: {
    fontSize: 26,
    color: "#333",
    marginBottom: 5,
  },
  title: {
    fontSize: 56,
    fontWeight: "bold",
    color: "#333",
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 20,
    color: "#555",
    marginTop: 5,
  },
  character: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    marginBottom: 100,
  },
  decorativeOlive: {
    position: "absolute",
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  nextButton: {
    position: "absolute",
    bottom: 40,
    backgroundColor: "transparent",
  },
  nextText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});