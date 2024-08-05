import { View, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";

import { Descripcion } from "../src/components/descripcion/Descripcion";
export default function Detail() {
  // se recupera la fecha de la URL
  const { date } = useLocalSearchParams(); // serviara para filtrar la data del estado global por la fecha de la URL

  return (
    <ScrollView>
      <View className="bg-white flex-1 items-center justify-center">
        <Stack.Screen
          options={{
            headerShown: false, // Oculta el encabezado
          }}
        />
        <Descripcion date={date}/>
      </View>
    </ScrollView>
  );
}
