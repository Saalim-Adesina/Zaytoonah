import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'


export default function TabLayout() {
    return (
        <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#92dc12ff'
        }}>
            <Tabs.Screen name='(home)' options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24}/>
                )
            }}
            />
            <Tabs.Screen name='scan' options={{
                headerShown: true,
                title: "Scan",
                tabBarIcon: ({focused, color}) => (
                    <Ionicons name='qr-code-outline' color={color} size={24}/>
                )
            }}/>
            <Tabs.Screen name='settings' options={{
                headerShown: false,
                title: "Settings",
                tabBarIcon: ({color, focused}) => {
                    return <Ionicons name={focused ? 'settings-sharp' : 'settings-outline' } color={color} size={24}/>
                },
    
                }}
            />
            <Tabs.Screen name='scan2' options={{
                headerShown: true,
                title: "Scan V2",
                tabBarIcon: ({focused, color}) => (
                    <Ionicons name='qr-code-outline' color={color} size={24}/>
                )
                }}
            />

        </Tabs>
    )
}