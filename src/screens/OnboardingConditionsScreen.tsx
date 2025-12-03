import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CONDITIONS = [
  { id: 'obesity', label: 'Obesity', icon: 'body-outline' },
  { id: 'allergies', label: 'Allergies', icon: 'flower-outline' },
  { id: 'diabetes', label: 'Diabetes', icon: 'water-outline' },
  { id: 'ckd', label: 'Chronic Kidney Disease (CKD)', icon: 'medkit-outline' },
  { id: 'hypertension', label: 'Hypertension', icon: 'pulse-outline' },
  { id: 'asthma', label: 'Asthma', icon: 'cloud-outline' },
];

export default function OnboardingConditionsScreen({ navigation }: any) {
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const toggleCondition = (id: string) => {
    if (selectedConditions.includes(id)) {
      setSelectedConditions(selectedConditions.filter(c => c !== id));
    } else {
      setSelectedConditions([...selectedConditions, id]);
    }
  };

  const handleNext = () => {
    navigation.navigate('OnboardingDetails', { conditions: selectedConditions });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="#E9F7D6" />
      <View style={styles.header}>
        <Text style={styles.title}>Do you have any chronic conditions?</Text>
        <Text style={styles.subtitle}>Select all that apply to help us personalize your experience.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {CONDITIONS.map((condition) => {
          const isSelected = selectedConditions.includes(condition.id);
          return (
            <TouchableOpacity 
              key={condition.id} 
              style={[styles.card, isSelected && styles.selectedCard]}
              onPress={() => toggleCondition(condition.id)}
            >
              <View style={styles.cardContent}>
                <View style={[styles.iconContainer, isSelected && styles.selectedIconContainer]}>
                  <Ionicons 
                    name={condition.icon as any} 
                    size={24} 
                    color={isSelected ? '#fff' : '#666'} 
                  />
                </View>
                <Text style={[styles.cardLabel, isSelected && styles.selectedCardLabel]}>
                  {condition.label}
                </Text>
              </View>
              {isSelected && (
                <Ionicons name="checkmark-circle" size={24} color="#8D9645" />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.nextButton, selectedConditions.length === 0 && styles.disabledButton]}
          onPress={handleNext}
          disabled={selectedConditions.length === 0}
        >
          <Text style={styles.nextButtonText}>Next</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('OnboardingStats')}>
            <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedCard: {
    backgroundColor: '#e8f5e9',
    borderColor: '#8D9645',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  selectedIconContainer: {
    backgroundColor: '#8D9645',
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  selectedCardLabel: {
    color: '#8D9645',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  nextButton: {
    backgroundColor: '#1a1a1a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  disabledButton: {
      backgroundColor: '#ccc',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  skipButton: {
      alignItems: 'center',
      padding: 8,
  },
  skipButtonText: {
      color: '#666',
      fontSize: 14,
  }
});
