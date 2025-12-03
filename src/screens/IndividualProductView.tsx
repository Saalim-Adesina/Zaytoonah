import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductDetails from '../components/ProductDetails';
import { PRODUCTS } from '../data/database';

export default function IndividualProductView({ route, navigation }: any) {
  const { productId, product: paramProduct } = route.params;
  
  let product = paramProduct;
  if (!product && productId) {
    product = PRODUCTS.find(p => p.id === productId);
  }

  // Mock alternatives (just other products for now)
  const alternatives = PRODUCTS.filter(p => p.id !== (product?.id || productId)).slice(0, 5);

  if (!product) {
      return (
          <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Product not found</Text>
          </SafeAreaView>
      )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>
      <ProductDetails 
        product={product}
        alternatives={alternatives}
        onBackPress={() => navigation.goBack()}
        onProductPress={(id) => navigation.push('IndividualProductView', { productId: id })}
      />
    </SafeAreaView>
  );
}
