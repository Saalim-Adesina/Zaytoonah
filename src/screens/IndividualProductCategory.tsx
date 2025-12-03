import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListView from '../components/ListView';
import { CATEGORIES, PRODUCTS } from '../data/database';

export default function IndividualProductCategory({ route, navigation }: any) {
  const { categoryId } = route.params;
  const category = CATEGORIES.find(c => c.id === categoryId);
  const products = PRODUCTS.filter(p => p.categoryId === categoryId);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>
      <ListView 
        categoryName={category?.name || 'Category'}
        products={products}
        onProductPress={(productId) => navigation.navigate('IndividualProductView', { productId })}
        onBackPress={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
}
