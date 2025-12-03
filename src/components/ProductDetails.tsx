import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Product {
  id: string;
  name: string;
  image: any;
  quantity?: string;
  categories?: string[];
  qrCode?: string;
  score: number;
  scoreLabel?: string;
  scoreColor?: string;
  verdict?: string;
  eatingInstructions?: string[];
  nutrients?: any[];
  [key: string]: any;
}

interface ProductDetailsProps {
  product: Product;
  alternatives: Product[];
  onBackPress: () => void;
  onProductPress: (productId: string) => void;
}

export default function ProductDetails({ product, alternatives, onBackPress, onProductPress }: ProductDetailsProps) {
  const [expandedNutrients, setExpandedNutrients] = useState(true);

  const renderAlternativeItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.altCard}
      onPress={() => onProductPress(item.id)}
    >
      <View style={styles.altImageContainer}>
        <Image source={item.image} style={styles.altImage} resizeMode="contain" />
      </View>
      <View style={styles.altScoreContainer}>
        <View style={[styles.altScoreDot, { backgroundColor: item.scoreColor || '#ccc' }]} />
        <Text style={[styles.altScoreText, { color: item.scoreColor || '#ccc' }]}>
          {item.score}/100
        </Text>
      </View>
      <Text style={styles.altScoreLabel}>{item.scoreLabel}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product View</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Top Section: Image & Info */}
        <View style={styles.topSection}>
          <View style={styles.mainImageContainer}>
            <Image source={product.image} style={styles.mainImage} resizeMode="contain" />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.productName}>{product.name}</Text>
            
            <Text style={styles.infoLabel}>Quantity: <Text style={styles.infoValue}>{product.quantity}</Text></Text>
            
            <Text style={styles.infoLabel}>Categories:</Text>
            <Text style={styles.infoValue}>{product.categories?.join(', ')}</Text>
            
            <Text style={styles.infoLabel}>QR Code:</Text>
            <Text style={styles.infoValue}>{product.qrCode}</Text>
          </View>
        </View>

        {/* Recommendation Section */}
        <Text style={styles.sectionTitle}>Recommendation</Text>
        
        <View style={styles.recommendationRow}>
          <View style={styles.scoreCircleContainer}>
             <View style={[styles.scoreCircle, { backgroundColor: product.scoreColor || '#ccc' }]}>
             </View>
             <View>
                 <Text style={[styles.bigScoreText, { color: product.scoreColor || '#ccc' }]}>
                    {product.score}/100
                 </Text>
                 <Text style={styles.bigScoreLabel}>{product.scoreLabel}</Text>
             </View>
          </View>
          
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to cart</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.verdictLabel}>Verdict</Text>
        <Text style={styles.verdictText}>{product.verdict}</Text>

        <Text style={styles.eatingInstructionsLabel}>Eating Instructions</Text>
        {product.eatingInstructions?.map((instruction, index) => (
          <Text key={index} style={styles.instructionText}>
            {index + 1}. {instruction}
          </Text>
        ))}

        {/* Healthier Alternatives */}
        <View style={styles.alternativesHeader}>
            <Text style={styles.sectionTitle}>Healthier Alternative Products</Text>
            <Ionicons name="arrow-forward-circle-outline" size={24} color="#FFA500" />
        </View>
        
        <FlatList
          data={alternatives}
          horizontal
          renderItem={renderAlternativeItem}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.alternativesList}
        />

        {/* Nutrient Information */}
        <Text style={styles.sectionTitle}>Nutrient Information</Text>
        <View style={styles.nutrientCard}>
            {product.nutrients?.map((nutrient, index) => (
                <View key={index} style={styles.nutrientRow}>
                    <View style={styles.nutrientLeft}>
                        <View style={[styles.nutrientIconPlaceholder, { backgroundColor: nutrient.color ? nutrient.color + '20' : '#eee' }]}>
                             {/* Icon placeholder */}
                             <Ionicons name="nutrition" size={16} color={nutrient.color || '#666'} />
                        </View>
                        <View>
                            <Text style={styles.nutrientName}>{nutrient.name}</Text>
                            <Text style={styles.nutrientLevel}>{nutrient.level}</Text>
                        </View>
                    </View>
                    <View style={styles.nutrientRight}>
                        <View style={[styles.nutrientDot, { backgroundColor: nutrient.color || '#ccc' }]} />
                        <Text style={styles.nutrientValue}>{nutrient.value}</Text>
                        <Ionicons name="chevron-down" size={16} color="#ccc" />
                    </View>
                </View>
            ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  topSection: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  mainImageContainer: {
    width: '40%',
    height: 180,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  mainImage: {
    width: '90%',
    height: '90%',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
    marginTop: 12,
  },
  recommendationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  scoreCircleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  scoreCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  bigScoreText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bigScoreLabel: {
    fontSize: 14,
    color: '#999',
  },
  addToCartButton: {
    backgroundColor: '#10559A',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 4,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  verdictLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  verdictText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  eatingInstructionsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    lineHeight: 20,
  },
  alternativesHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 20,
      marginBottom: 10,
  },
  alternativesList: {
      paddingBottom: 10,
  },
  altCard: {
      width: 100,
      marginRight: 12,
      alignItems: 'center',
  },
  altImageContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#f0f0f0',
      marginBottom: 8,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
  },
  altImage: {
      width: '80%',
      height: '80%',
  },
  altScoreContainer: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  altScoreDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 4,
  },
  altScoreText: {
      fontSize: 12,
      fontWeight: 'bold',
  },
  altScoreLabel: {
      fontSize: 10,
      color: '#999',
  },
  nutrientCard: {
      backgroundColor: '#fff',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#eee',
      padding: 16,
      marginBottom: 20,
  },
  nutrientRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#f5f5f5',
  },
  nutrientLeft: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  nutrientIconPlaceholder: {
      width: 32,
      height: 32,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
  },
  nutrientName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333',
  },
  nutrientLevel: {
      fontSize: 12,
      color: '#999',
  },
  nutrientRight: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  nutrientDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 8,
  },
  nutrientValue: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333',
      marginRight: 8,
  },
});
