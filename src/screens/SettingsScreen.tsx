import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useUser } from '../context/userContext';
import { DETAILS_OPTIONS } from '../data/database';

const getDetailLabel = (detailId: string) => {
    for (const key in DETAILS_OPTIONS) {
        const option = DETAILS_OPTIONS[key].find((opt: any) => opt.id === detailId);
        if (option) return option.label;
    }
    return detailId;
};

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { userSettings, updateProfile, logout } = useUser();
  
  const [name, setName] = useState(userSettings.name);
  const [email, setEmail] = useState(userSettings.email);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    updateProfile({ name, email });
    setIsEditing(false);
    Alert.alert("Success", "Profile updated successfully");
  };

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' as never }]})
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        {isEditing ? (
           <TouchableOpacity onPress={handleSave}>
             <Text style={styles.saveButton}>Save</Text>
           </TouchableOpacity>
        ) : (
           <TouchableOpacity onPress={() => setIsEditing(true)}>
             <Text style={styles.editButton}>Edit</Text>
           </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
             <Image 
               source={userSettings.avatar || require('../../assets/images/3d_avatar_21.png')} 
               style={styles.avatar} 
             />
             {isEditing && (
               <TouchableOpacity style={styles.changeAvatarButton}>
                 <Ionicons name="camera" size={20} color="#fff" />
               </TouchableOpacity>
             )}
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              value={name}
              onChangeText={setName}
              editable={isEditing}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              value={email}
              onChangeText={setEmail}
              editable={isEditing}
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* Stats Section (Read Only for now) */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Stats</Text>
            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{userSettings.stats?.age || '-'}</Text>
                    <Text style={styles.statLabel}>Age</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{userSettings.stats?.weight || '-'}</Text>
                    <Text style={styles.statLabel}>Weight</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{userSettings.stats?.height || '-'}</Text>
                    <Text style={styles.statLabel}>Height</Text>
                </View>
            </View>
        </View>

        {/* Conditions Section */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Conditions</Text>
            <View style={styles.conditionsRow}>
                {userSettings.conditions && userSettings.conditions.length > 0 ? (
                    userSettings.conditions.map((condition, index) => (
                        <View key={index} style={styles.conditionBadge}>
                            <Text style={styles.conditionText}>{condition}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyText}>No conditions selected</Text>
                )}
            </View>
        </View>

        {/* Details Section */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Specifics</Text>
            <View style={styles.conditionsRow}>
                {userSettings.details && userSettings.details.length > 0 ? (
                    userSettings.details.map((detail: string, index: number) => (
                        <View key={index} style={[styles.conditionBadge, { backgroundColor: '#e3f2fd' }]}>
                            <Text style={[styles.conditionText, { color: '#1565c0' }]}>{getDetailLabel(detail)}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyText}>No specifics selected</Text>
                )}
            </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log Out</Text>
            <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    fontSize: 16,
    color: '#007AFF',
  },
  saveButton: {
    fontSize: 16,
    color: '#34C759',
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  profileSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
    color: '#333',
    borderColor: 'transparent',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  conditionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  conditionBadge: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  conditionText: {
    color: '#2E7D32',
    fontSize: 14,
  },
  emptyText: {
    color: '#999',
    fontStyle: 'italic',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});
