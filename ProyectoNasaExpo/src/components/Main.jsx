import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Animated,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { ImagenDelDia } from "./ImagenDelDia";
import { LastFiveImages } from './LastFiveImages'
import { Header } from "./Header";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // utilidad para obtener los margenes seguros del dispositivo

export default function Main() {

  const moveAnim = new Animated.Value(-100); // Movimiento horizontal
  const verticalAnim = new Animated.Value(0); // Movimiento vertical
  const rotateAnim = new Animated.Value(0); // Rotación

  const insets = useSafeAreaInsets(); // margenes seguros del dispositivo
  const image = {
    uri: "https://www.ucf.edu/wp-content/blogs.dir/20/files/2021/08/UCF-Space-Exploration.jpg",
  };

  useEffect(() => {
    // Movimiento horizontal
    const moveHorizontal = Animated.loop(
      Animated.timing(moveAnim, {
        toValue: 400, // Mueve a la derecha fuera de la pantalla
        duration: 5000, // 5 segundos de duración
        useNativeDriver: true,
      })
    );

    // Movimiento vertical (simulando gravedad)
    const moveVertical = Animated.loop(
      Animated.sequence([
        Animated.timing(verticalAnim, {
          toValue: 500, // Caída
          duration: 8000, // 8 segundos de caída
          useNativeDriver: true,
        }),
        Animated.timing(verticalAnim, {
          toValue: 0, // Regresa al punto inicial
          duration: 8000, // 8 segundos de subida
          useNativeDriver: true,
        }),
      ])
    );

    // Rotación continua
    const rotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 360,
        duration: 3000, // 3 segundos para una rotación completa
        useNativeDriver: true,
      })
    );

    Animated.parallel([moveHorizontal, moveVertical, rotate]).start();
  }, [moveAnim]);

  // Interpolación para rotación
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });
  return (
    <View
      style={[
        { paddingTop: insets.top, paddingBottom: insets.bottom },
        styles.container,
      ]}
    >
      <Header />

      <LinearGradient
        colors={["#0000CD", "#00008B"]} // Azul profundo en la parte superior y azul profundo ligeramente más claro en la parte inferior
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.containerBackground}
      >
        <ImageBackground source={image} style={styles.fondoImg} />
        <Animated.Image
          style={[
            styles.cometa,
            {
              transform: [
                { translateX: moveAnim },
                { translateY: verticalAnim },
                { rotate: rotateInterpolate },
              ],
            },
          ]}
          source={require("../../assets/cometa-fondo.png")}
        />
        <View style={styles.overlayContainer}>
          <BlurView intensity={30} style={styles.blurView}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              Imagen del Día
            </Text>
          </BlurView>

          <ImagenDelDia />
          <Text style={{color: 'white', opacity: 0.8, marginVertical: 6, fontSize: 18, alignSelf: 'flex-start' }}>
            Últimos 5 días
          </Text>
          <LastFiveImages />
          
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },
  blurView: {
    marginTop: 8,
    width: 340,
    height: 25,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 16,
  },
  fondoImg: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: "1/1",
    resizeMode: "contain",
    opacity: 0.5,
    zIndex: 0,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "top",
    // alignItems: "center",
    zIndex: 2, // Contenido sobre el fondo
  },
  containerImage: {
    width: 350,
    backgroundColor: "transparent",
    opacity: 1,
    zIndex: 2,
  },
  cometa: {
    position: "absolute",

    left: 0, // Comienza fuera de la pantalla a la izquierda
    top: "50%", // Posición vertical en el medio de la pantalla
    width: 30,
    height: 30,
    zIndex: 1,
  },

});
