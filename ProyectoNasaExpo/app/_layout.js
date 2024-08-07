import { View } from "react-native";
import { Slot, Stack } from "expo-router";
import { Header } from "../src/components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // utilidad para obtener los margenes seguros del dispositivo
import { Provider as PaperProvider } from "react-native-paper"; // para renderizar la modal 


// Documentación > https://www.npmjs.com/package/react-native-toast-message
export default function Layout() {
  const insets = useSafeAreaInsets(); // margenes seguros del dispositivo
  return (
    <PaperProvider>
      <View
        className="flex-1 justify-center"
        style={{ marginTop: insets.top, marginBottom: insets.bottom }}
      >

        <Stack
          screenOptions={{
            headerShown: true,
            statusBarColor: "black",
            statusBarHidden: false, // la barra de estado no se oculta
            headerStyle: { backgroundColor: "black" },
            header: () => <Header />,
          }}
        />
      </View>
    </PaperProvider>
  );
}
