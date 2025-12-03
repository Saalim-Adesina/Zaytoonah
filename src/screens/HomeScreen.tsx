import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../context/userContext';
import { CATEGORIES, PRODUCTS } from '../data/database';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 48) / 2; // 2 columns with padding

// Mock data for categories - mapping to available assets

export default function HomeScreen() {
  const navigation = useNavigation();
  const { userSettings } = useUser();

  return (
    <View style={styles.mainContainer}>
      <StatusBar style="dark" backgroundColor="#E9F7D6" />
      
      {/* Header Background Area */}
      <SafeAreaView style={styles.headerSafeArea} edges={['top']}>
        <View style={styles.headerContent}>
           
           {/* Greeting Section */}
           <View style={styles.greetingContainer}>
               <Image 
                 source={require('../../assets/images/logo.png')} 
                 style={styles.mascot} 
               />
               <View style={styles.textContainer}>
                  <Text style={styles.welcomeText}>Welcome back,</Text>
                  <Text style={styles.userName}>{userSettings.name || 'Guest'}</Text>
               </View>
           </View>
           
           {/* Avatar */}
           <TouchableOpacity 
             style={styles.avatarContainer}
             onPress={() => navigation.navigate('Settings' as never)}
           >
             <Image 
               source={userSettings.avatar || require('../../assets/images/3d_avatar_21.png')} 
               style={styles.avatar} 
             />
           </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput 
            placeholder="Search Item" 
            style={styles.searchInput} 
            placeholderTextColor="#666" 
          />
          <Ionicons name="search-outline" size={24} color="#333" />
        </View>

        {/* Scan Button */}
        <TouchableOpacity 
          style={styles.scanButton}
          onPress={() => navigation.navigate('Scan' as never)}
        >
          <Text style={styles.scanButtonText}>Scan Product</Text>
          <Ionicons name="qr-code-outline" size={28} color="black" />
        </TouchableOpacity>

        {/* Categories Section */}
        <Text style={styles.sectionTitle}>Explore Categories</Text>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={true}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 15 }}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.categoryItem}
              onPress={() => navigation.navigate('IndividualProductCategory', { categoryId: item.id })}
            >
              <View style={styles.categoryImageContainer}>
                <Image source={item.image} style={styles.categoryImage} />
              </View>
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

		<Text style={styles.sectionTitle}>Products Near You</Text>
		<View style={styles.productsContainer}>
      {PRODUCTS.map((item) => (
        <TouchableOpacity 
          key={item.id}
          style={styles.productCard}
          onPress={() => navigation.navigate('IndividualProductView', { productId: item.id })}
        >
          <View style={styles.productImageContainer}>
            <Image source={item.image} style={styles.productImage} resizeMode="contain" />
          </View>
          <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
          
          <View style={styles.scoreContainer}>
            <View style={[styles.scoreDot, { backgroundColor: item.scoreColor || '#ccc' }]} />
            <Text style={[styles.scoreText, { color: item.scoreColor || '#ccc' }]}>
              {item.score}/100 <Text style={styles.scoreLabel}>{item.scoreLabel}</Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to cart</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
		</View>

    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerSafeArea: {
    backgroundColor: '#E9F7D6', // Light green header background
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mascot: {
    width: 60,
    height: 70,
    resizeMode: 'contain',
    marginRight: 12,
  },
  textContainer: {
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 2,
  },
  userName: {
    fontSize: 22,
    fontWeight: '900', // Extra bold
    color: 'black',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFD580', // Fallback color
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom tab bar
  },
  searchContainer: {
    backgroundColor: '#F2EFF7', // Light purple/gray
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 55,
    marginHorizontal: 20,
    marginTop: 25,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    height: '100%',
  },
  scanButton: {
    backgroundColor: '#B6F776', // Lime green
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scanButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 20,
    marginTop: 35,
    marginBottom: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  categoryItem: {
    alignItems: 'center',
    width: width / 3.5,
  },
  categoryImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  productCard: {
    width: COLUMN_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
  },
  productImageContainer: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    height: 40, // Fixed height for 2 lines
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  scoreLabel: {
    fontWeight: 'normal',
    color: '#999',
  },
  addToCartButton: {
    backgroundColor: '#10559A', // Blue color from image
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});