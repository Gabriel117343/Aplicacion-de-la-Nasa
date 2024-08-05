import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // utilidad para obtener los margenes seguros del dispositivo
import { ScrollView, View } from "react-native";
import InformacionNasa from "../src/components/informacion/InformacionNasa";
export default function Informacion() {
  const insets = useSafeAreaInsets(); // margenes seguros del dispositivo
  return (
    <ScrollView>
      <View className="bg-white flex-1 items-center justify-center">
        <Stack.Screen
          options={{
            headerShown: false, // Oculta el encabezado
          }}
        />
        <InformacionNasa />
      </View>
    </ScrollView>
  );
}
