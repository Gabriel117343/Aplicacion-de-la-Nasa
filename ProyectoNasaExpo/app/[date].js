import { View, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { Header } from "../src/components/descripcion/Header";

export default function Detail() {
  // se recupera la fecha de la URL
  const { date } = useLocalSearchParams();

  return (
    <ScrollView>
      <View className="bg-white flex-1 items-center justify-center">
        <Stack.Screen
          options={{
            headerShown: false, // Oculta el encabezado
          }}
        />
        <Descripcion />
      </View>
    </ScrollView>
  );
}
