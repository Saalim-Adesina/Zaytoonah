import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HomeScreen from '../screens/HomeScreen';
import IndividualProductCategory from '../screens/IndividualProductCategory';
import IndividualProductView from '../screens/IndividualProductView';
import LoginScreen from '../screens/LoginScreen';
import OnboardingConditionsScreen from '../screens/OnboardingConditionsScreen';
import OnboardingDetailsScreen from '../screens/OnboardingDetailsScreen';
import OnboardingStatsScreen from '../screens/OnboardingStatsScreen';
import ScanScreen from '../screens/ScanScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="OnboardingConditions" component={OnboardingConditionsScreen} />
      <AuthStack.Screen name="OnboardingDetails" component={OnboardingDetailsScreen} />
      <AuthStack.Screen name="OnboardingStats" component={OnboardingStatsScreen} />
    </AuthStack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "Home Screen" }} />
      <HomeStack.Screen name="IndividualProductCategory" component={IndividualProductCategory} />
      <HomeStack.Screen name="IndividualProductView" component={IndividualProductView} />
    </HomeStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#92dc12ff',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStackScreen} 
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          )
        }}
      />
      <Tab.Screen 
        name="Scan" 
        component={ScanScreen} 
        options={{
          headerShown: true,
          title: "Scan",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name='qr-code-outline' color={color} size={24} />
          )
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          headerShown: false,
          title: "Settings",
          tabBarIcon: ({ color, focused }) => {
            return <Ionicons name={focused ? 'settings-sharp' : 'settings-outline'} color={color} size={24} />
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Auth" component={AuthNavigator} />
      <RootStack.Screen name="Main" component={TabNavigator} />
      <RootStack.Screen 
        name="IndividualProductView" 
        component={IndividualProductView} 
        options={{ presentation: 'modal' }}
      />
    </RootStack.Navigator>
  );
}
