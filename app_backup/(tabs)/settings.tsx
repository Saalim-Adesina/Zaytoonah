import React, { useState, useEffect } from 'react';
import {useRouter} from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native';

const chronicConditions = [
  { id: 'diabetes', label: 'Diabetes' },
  { id: 'ckd', label: 'Chronic Kidney Disease' },
  { id: 'hypertension', label: 'Hypertension' },
  { id: 'asthma', label: 'Asthma' },
  { id: 'copd', label: 'Chronic Obstructive Pulmonary Disease' },
  {id: 'gluten', label: "Gluten Allergy"}
];

const conditionTypes = {
  diabetes: [
    { id: 'type1', label: 'Type 1 Diabetes' },
    { id: 'type2', label: 'Type 2 Diabetes' },
    { id: 'gestational', label: 'Gestational Diabetes' },
  ],
  ckd: [
    { id: 'stage1', label: 'Stage 1 CKD' },
    { id: 'stage2', label: 'Stage 2 CKD' },
    { id: 'stage3', label: 'Stage 3 CKD' },
    { id: 'stage4', label: 'Stage 4 CKD' },
    { id: 'stage5', label: 'Stage 5 CKD' },
  ],
  hypertension: [
    { id: 'primary', label: 'Primary Hypertension' },
    { id: 'secondary', label: 'Secondary Hypertension' },
  ],
  asthma: [
    { id: 'allergic', label: 'Allergic Asthma' },
    { id: 'nonallergic', label: 'Non-allergic Asthma' },
  ],
  copd: [
    { id: 'chronicbronchitis', label: 'Chronic Bronchitis' },
    { id: 'emphysema', label: 'Emphysema' },
  ],
  gluten: [
    {id: "celiac", label: "Celiac Disease"},
    {id: "NCGS", label: "Non-Celiac Gluten Sensitivity"},
    {id: "Wheat Allergy", label: "Allergy to wheat"},
  ]
};

const SettingsPage: React.FC = () => {
  const [age, setAge] = useState('');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedConditionTypes, setSelectedConditionTypes] = useState<string[]>([]);
  const [conditionDurations, setConditionDurations] = useState<Record<string, string>>({});

  const router = useRouter();

  useEffect(() => {
    // Clear out durations for conditions no longer selected
    setConditionDurations(prev => {
      const newDurations: Record<string, string> = {};
      selectedConditions.forEach(cond => {
        if (prev[cond]) newDurations[cond] = prev[cond];
      });
      return newDurations;
    });
    // Filter out condition types not valid
    const allowedTypes = selectedConditions.flatMap(
      cond => (conditionTypes as any)[cond]?.map((type: any) => type.id) || []
    );
    setSelectedConditionTypes(prev => prev.filter(type => allowedTypes.includes(type)));
  }, [selectedConditions]);

  const toggleCondition = (id: string) => {
    setSelectedConditions(prev =>
      prev.includes(id) ? prev.filter(cond => cond !== id) : [...prev, id]
    );
    // Reset condition duration if condition removed
    setConditionDurations(prev => {
      if (prev[id]) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return prev;
    });
  };

  const toggleType = (id: string) => {
    setSelectedConditionTypes(prev =>
      prev.includes(id) ? prev.filter(type => type !== id) : [...prev, id]
    );
  };

  const onDurationChange = (condId: string, value: string) => {
    setConditionDurations(prev => ({
      ...prev,
      [condId]: value,
    }));
  };

  const handleSave = () => {
    // In a real app validate inputs here
    Alert.alert('Settings saved!', 'Your input has been saved.', [{ text: 'OK' }]);
    router.push('/scan');
    // Isolated state, no sharing
  };

  return (
    <SafeAreaView style={styles.safeArea}>
         <StatusBar
     backgroundColor="black"
     barStyle="dark-content"
   />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
        <Text style={styles.header}>Settings</Text>

        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={age}
          keyboardType="number-pad"
          onChangeText={setAge}
          placeholder="Enter age"
          maxLength={3}
          selectionColor="black"
          placeholderTextColor="#333"
        />

        <Text style={styles.label}>Select your chronic condition(s):</Text>
        <View>
          {chronicConditions.map(condition => (
            <TouchableOpacity
              key={condition.id}
              style={styles.checkboxBox}
              onPress={() => toggleCondition(condition.id)}
            >
              <View
                style={[
                  styles.checkbox,
                  selectedConditions.includes(condition.id) && styles.selectedCheckbox,
                ]}
              />
              <Text style={styles.checkboxLabel}>{condition.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedConditions.length > 0 && (
          <>
            <Text style={styles.label}>Select exact type(s):</Text>
            {selectedConditions.map(cond => (
              <View key={cond} style={styles.typeGroup}>
                <Text style={styles.typeHeading}>
                  {chronicConditions.find(c => c.id === cond)?.label}
                </Text>
                {(conditionTypes as any)[cond].map((type: any) => (
                  <TouchableOpacity
                    key={type.id}
                    style={styles.checkboxBox}
                    onPress={() => toggleType(type.id)}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        selectedConditionTypes.includes(type.id) && styles.selectedCheckbox,
                      ]}
                    />
                    <Text style={styles.checkboxLabel}>{type.label}</Text>
                  </TouchableOpacity>
                ))}

                {/* Duration field specific to each condition */}
                <Text style={styles.subLabel}>How many months have you had {chronicConditions.find(c => c.id === cond)?.label}?</Text>
                <TextInput
                  style={styles.input}
                  value={conditionDurations[cond] || ''}
                  onChangeText={(val) => onDurationChange(cond, val)}
                  placeholder="e.g., 5 years, 2 months"
                  placeholderTextColor="#333"
                  selectionColor="black"
                />
              </View>
            ))}
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f6d0', // light green background
    paddingTop: 20
  },
  container: {
    padding: 24,
    paddingBottom: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#064420', // dark green text for header
  },
  label: {
    fontSize: 16,
    marginTop: 18,
    marginBottom: 6,
    color: '#064420',
  },
  subLabel: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 4,
    fontWeight: '500',
    color: '#064420',
  },
  input: {
    borderWidth: 1,
    borderColor: '#88b88b',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#000',
  },
  checkboxBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#88b88b',
    borderRadius: 3,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  selectedCheckbox: {
    backgroundColor: '#265d00', // darker green
    borderColor: '#1e4a00',
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#064420',
  },
  typeGroup: {
    marginLeft: 10,
    marginBottom: 16,
  },
  typeHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#064420',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#346810ff', // darker green
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonText: {
    color: '#e0efd8',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default SettingsPage;
