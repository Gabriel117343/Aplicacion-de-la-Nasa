import React from "react";
import Main from "./src/components/Main";

import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context"; // proveera un area segura para los componentes

// ESTE COMPONENTE YA NO SE UTILIZA CON EXPO-ROUTER (VER ProyectoNasaExpo/app/_layout.js)
export default function App() {
  return (
  
      <SafeAreaProvider>
       
          <View style={styles.container}>
            <Main />
          </View>
  
      </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
