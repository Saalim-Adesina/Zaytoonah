import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 48) / 2; // 2 columns with padding

interface Product {
  id: string;
  name: string;
  image: any;
  score: number;
  scoreLabel?: string;
  scoreColor?: string;
  [key: string]: any;
}

interface ListViewProps {
  categoryName: string;
  products: Product[];
  onProductPress: (productId: string) => void;
  onBackPress: () => void;
}

export default function ListView({ categoryName, products, onProductPress, onBackPress }: ListViewProps) {
  
  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => onProductPress(item.id)}
    >
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
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
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
         </TouchableOpacity>
         <View style={{ width: 24 }} />
      </View>

      <FlatList
        ListHeaderComponent={
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Tailored {categoryName} Products</Text>
            <Text style={styles.description}>
              Industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </Text>
          </View>
        }
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
      paddingHorizontal: 16,
      paddingVertical: 10,
  },
  backButton: {
      padding: 4,
  },
  titleContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: COLUMN_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  image: {
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
