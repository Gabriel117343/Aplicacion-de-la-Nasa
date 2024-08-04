import { View } from "react-native";
import { Slot, Stack } from "expo-router";
import { Header } from "../src/components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // utilidad para obtener los margenes seguros del dispositivo
import { StatusBar } from "expo-status-bar";
export default function Layout() {
  const insets = useSafeAreaInsets(); // margenes seguros del dispositivo
  return (
    <View
      className="flex-1 justify-center"
      style={{ marginTop: insets.top, marginBottom: insets.bottom }}
    >

      <StatusBar style="dark" backgroundColor="black" />
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: "transparent" },
          header: () => <Header />,
        }}
      />
    </View>
  );
}
