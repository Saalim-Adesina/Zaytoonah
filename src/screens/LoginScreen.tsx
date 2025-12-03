import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../context/userContext';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }: any) {
  const { updateProfile } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = () => {
    updateProfile({ email, name: email.split('@')[0] || 'User' });
    navigation.navigate('OnboardingConditions');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" backgroundColor="black" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Mascot & Title */}
        <View style={styles.header}>
          <Image 
            source={require('../../assets/images/olive-character.png')} 
            style={styles.mascot} 
            resizeMode="contain" 
          />
          <Text style={styles.title}>Enter your Account</Text>
        </View>

        {/* Auth Card */}
        <View style={styles.card}>
          
          {/* Toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity 
              style={[styles.toggleButton, isLogin && styles.activeToggle]} 
              onPress={() => setIsLogin(true)}
            >
              <Ionicons name="log-in-outline" size={18} color={isLogin ? '#000' : '#666'} />
              <Text style={[styles.toggleText, isLogin && styles.activeToggleText]}> Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.toggleButton, !isLogin && styles.activeToggle]} 
              onPress={() => setIsLogin(false)}
            >
              <Ionicons name="person-add-outline" size={18} color={!isLogin ? '#000' : '#666'} />
              <Text style={[styles.toggleText, !isLogin && styles.activeToggleText]}> Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Inputs */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              placeholderTextColor="#d0d0d0ff"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.passwordHeader}>
              <Text style={styles.label}>Password</Text>
              {isLogin && (
                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
              )}
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#d0d0d0ff"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Main Button */}
          <TouchableOpacity style={styles.mainButton} onPress={handleAuth}>
            <Text style={styles.mainButtonText}>{isLogin ? 'Log In' : 'Sign Up'}</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Buttons */}
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={20} color="#000" />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-apple" size={20} color="#000" />
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="wallet-outline" size={20} color="#000" />
            <Text style={styles.socialButtonText}>Continue with Wallet</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {isLogin ? "Don't have an account yet? " : "Already have an account? "}
            </Text>
            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
              <Text style={styles.footerLink}>{isLogin ? 'Sign up' : 'Log in'}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

    safeArea: {

    },
  container: {
    flex: 1,
    backgroundColor: '#ffffffff', // Light green background
  },
  scrollContent: {
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  mascot: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: 'serif', // Trying to match the serif font in the image
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
    minHeight: 100,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 4,
    alignSelf: 'center',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  activeToggle: {
    backgroundColor: '#fff',
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeToggleText: {
    color: '#000',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  forgotPassword: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: 'black'
  },
  mainButton: {
    backgroundColor: '#8D9645', // Dark button
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
    color: "#000000ff"
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#eee',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#999',
    fontSize: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 12,
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  footerLink: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
