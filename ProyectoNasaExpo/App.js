import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Animated,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const [loading, setLoading] = useState("");
  const moveAnim = new Animated.Value(-100); // Movimiento horizontal
  const verticalAnim = new Animated.Value(0); // Movimiento vertical
  const rotateAnim = new Animated.Value(0); // Rotación

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
    <LinearGradient
      colors={['#0000CD', '#00008B']} // Azul profundo en la parte superior y azul profundo ligeramente más claro en la parte inferior
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
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
        source={require('./assets/cometa-fondo.png')}
      />
      <View style={styles.overlayContainer}>
        <BlurView intensity={30} style={styles.blurView}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            Aplicación De La NASA
          </Text>
        </BlurView>

        <Text>Loading: {loading}</Text>

        <StatusBar style="auto" />
        <View style={styles.containerImage}>
          <Image
            alt="imagenCodigo"
            onLoadStart={() => setLoading("Cargando imagen")}
            onLoadEnd={() => setLoading("Imagen cargada")}
            fadeDuration={2000}
            style={styles.imagenCodigo}
            source={require("./assets/imagen-codigo.png")}
          />
        </View>
        <View style={styles.containerImage}>
          <Image
            alt="ImagenGalaxia"
            fadeDuration={2000}
            style={styles.imagenCodigo}
            testID="imagenGalaxia"
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0nDxLmFXEhxBFJSuE4OY6XAz7U3xXU2bF2Q&s",
            }}
          />
        </View>
      </View>

      
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Contenido sobre el fondo
  },
  containerImage: {
    width: 350,
    backgroundColor: "transparent",
    opacity: 1,
    zIndex: 1,
    
  },
  imagenCodigo: {
    height: 210,
    aspectRatio: "5/3",
    resizeMode: "cover",
    borderWidth: 10,
    borderColor: "blue",
    borderStyle: "solid",

  },
  cometa: {
    position: "absolute",
    zIndex: 1,
    left: 0, // Comienza fuera de la pantalla a la izquierda
    top: '50%', // Posición vertical en el medio de la pantalla
    width: 30,
    height: 30,
    zIndex: -1,
  }
});

