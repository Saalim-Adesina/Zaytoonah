import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {DETAILS_OPTIONS} from "../data/database";


export default function OnboardingDetailsScreen({ route, navigation }: any) {
  const { conditions } = route.params || { conditions: [] };
  const [selectedDetails, setSelectedDetails] = useState<string[]>([]);

  // Filter relevant sections based on previous selection
  const relevantSections = Object.keys(DETAILS_OPTIONS).filter(key => conditions.includes(key));

  const toggleDetail = (id: string) => {
    if (selectedDetails.includes(id)) {
      setSelectedDetails(selectedDetails.filter(d => d !== id));
    } else {
      setSelectedDetails([...selectedDetails, id]);
    }
  };

  const handleNext = () => {
    navigation.navigate('OnboardingStats', { conditions, details: selectedDetails });
  };

  if (relevantSections.length === 0) {
      // If no detailed conditions selected, skip this screen
      // In a real app, you might check this before navigating here
      return (
        <SafeAreaView style={styles.container}>
            <View style={styles.centerContent}>
                <Text style={styles.message}>No specific details needed for your selection.</Text>
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
      )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Let's get specific</Text>
        <Text style={styles.subtitle}>Select the specific types for your conditions.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {relevantSections.map((sectionKey) => (
          <View key={sectionKey} style={styles.section}>
            <Text style={styles.sectionTitle}>
              {sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}
            </Text>
            <View style={styles.optionsGrid}>
              {DETAILS_OPTIONS[sectionKey].map((option: any) => {
                const isSelected = selectedDetails.includes(option.id);
                return (
                  <TouchableOpacity 
                    key={option.id} 
                    style={[styles.chip, isSelected && styles.selectedChip]}
                    onPress={() => toggleDetail(option.id)}
                  >
                    <Text style={[styles.chipText, isSelected && styles.selectedChipText]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
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
  centerContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
  },
  message: {
      fontSize: 18,
      color: '#666',
      marginBottom: 24,
      textAlign: 'center',
  },
  header: {
    padding: 24,
  },
  backButton: {
      marginBottom: 16,
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedChip: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4CAF50',
  },
  chipText: {
    fontSize: 14,
    color: '#666',
  },
  selectedChipText: {
    color: '#2E7D32',
    fontWeight: '600',
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
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});
