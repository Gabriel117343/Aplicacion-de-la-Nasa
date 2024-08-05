import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from "./Header";

// Este componente sirve como contenedor de las pantallas, definiendo un fondo gradiente y un encabezado fijo en la parte superior.
export const Screen = ({ children }) => {
  return (
    <LinearGradient
      colors={["#1a1440", "#120f2c", "#0a0818"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      <Header />
      <View style={styles.container}>
        {children}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    marginHorizontal: 0.5,
  },
  container: {
    flex: 1,

    paddingHorizontal: 20,

    paddingBottom: 120,
  },
});

export default Screen;