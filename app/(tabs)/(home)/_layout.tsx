import { Stack } from "expo-router";

export default function HomeLayout() {
  return <Stack 
  screenOptions={{
    headerStyle: {
      backgroundColor: "#222501ff",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight:"bold", 
    }
  }}
  >
    <Stack.Screen name="index" options={{title: ""}}/>
  </Stack>;
}
