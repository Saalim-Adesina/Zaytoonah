import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../context/userContext';

export default function OnboardingStatsScreen({ route, navigation }: any) {
  const { conditions, details } = route.params || { conditions: [], details: [] };
  const { updateProfile } = useUser();

  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const handleFinish = () => {
    updateProfile({
        conditions,
        details,
        stats: { age, weight, height }
    });

    navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Almost done!</Text>
        <Text style={styles.subtitle}>Tell us a bit about yourself.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. 25"
                    placeholderTextColor="#d0d0d0ff"
                    keyboardType="numeric"
                    value={age}
                    onChangeText={setAge}
                />
                <Text style={styles.unit}>years</Text>
            </View>
        </View>

        <View style={styles.inputGroup}>
            <Text style={styles.label}>Weight</Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. 70"
                    placeholderTextColor="#d0d0d0ff"
                    keyboardType="numeric"
                    value={weight}
                    onChangeText={setWeight}
                />
                <Text style={styles.unit}>kg</Text>
            </View>
        </View>

        <View style={styles.inputGroup}>
            <Text style={styles.label}>Height</Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. 175"
                    placeholderTextColor="#d0d0d0ff"
                    keyboardType="numeric"
                    value={height}
                    onChangeText={setHeight}
                />
                <Text style={styles.unit}>cm</Text>
            </View>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
          <Text style={styles.finishButtonText}>Finish Setup</Text>
          <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
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
  content: {
    paddingHorizontal: 24,
  },
  inputGroup: {
      marginBottom: 24,
  },
  label: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
      marginBottom: 8,
  },
  inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#eee',
      borderRadius: 12,
      backgroundColor: '#f9f9f9',
      paddingHorizontal: 16,
  },
  input: {
      flex: 1,
      paddingVertical: 16,
      fontSize: 18,
      color: '#333',
  },
  unit: {
      fontSize: 16,
      color: '#999',
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
  finishButton: {
    backgroundColor: '#8D9645',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
});
