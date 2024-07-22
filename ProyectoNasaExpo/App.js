import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ImageBackground, Animated } from "react-native";
import React, { useState, useEffect } from "react";
import { BlurView } from 'expo-blur'; // Para el desenfoque de fondo
export default function App() {
  const [loading, setLoading] = useState("");
  const moveAnim = new Animated.Value(0); // Paso 2
  const image = { uri: "https://www.ucf.edu/wp-content/blogs.dir/20/files/2021/08/UCF-Space-Exploration.jpg" }
  
  useEffect(() => {
    Animated.loop( // Hace que la animación se repita infinitamente
      Animated.sequence([ // Ejecuta una secuencia de animaciones
        Animated.timing(moveAnim, {
          toValue: 100,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [moveAnim]);
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.fondoImg}>
      {/* Fondo con opacidad */}
      </ImageBackground>

        <BlurView intensity={30} >
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Aplicación De La NASA</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c449d",
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
    aspectRatio: '1/1',
    resizeMode: "contain",
    opacity: 0.4,
  },
  containerImage: {
    borderWidth: 10,

    borderColor: "blue",
    borderStyle: "solid",
    height: 305,
    width: 305,
    backgroundColor: "white",
  },
  imagenCodigo: {
    height: "100%",
    aspectRatio: '1/1',
    resizeMode: "cover",

  },
});
