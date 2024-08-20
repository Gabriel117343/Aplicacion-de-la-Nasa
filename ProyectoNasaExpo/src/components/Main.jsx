import { StyleSheet, Text, View, ImageBackground, Button } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { ImagenDelDia } from "./ImagenDelDia";
import { LastFiveImages } from "./LastFiveImages";

import { Cometa } from "./shared/Cometa";
import { Satelite } from "./shared/Satelite";
import { toast } from "react-native-toast-lite";


export default function Main() {
  const image = {
    uri: "https://www.ucf.edu/wp-content/blogs.dir/20/files/2021/08/UCF-Space-Exploration.jpg",
  };
  const enviarDatos = () => {
  

    toast.loading("Cargando...", {
      title: 'Enviando datos',
      animationType: "fade",
      id: "cargaDatos",
      position: 'bottom', // estado persistente si cambia el loading a success
      toastStyle: "primary",

      styles: { backgroundColor: 'red', bottom: 200, left: 200 }

    
    });
    toast.success("¡Gracias por visitarnosss!", { toastStyle: 'primary', icon : '🚀', position: 'center', duration: 4000})
    setTimeout(() => {
      toast.success('Se ha enviado correctamente!', {title: 'Exito!', id: 'cargaDatos', animationType: "bounce", toastStyle: "secondary", inheritStyles: false, border: false, styles: {}})
    }, 2000) 
    
  };

  return (
    <View style={[styles.container]}>
      <LinearGradient
        colors={["#0000CD", "#00008B"]} // Azul profundo en la parte superior y azul profundo ligeramente más claro en la parte inferior
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.containerBackground}
      >
        <ImageBackground source={image} style={styles.fondoImg} />
        <Satelite />
        <Cometa />
        <Button title="Mostrar mensaje" onPress={enviarDatos} />

        <View style={styles.overlayContainer}>
          <BlurView intensity={30} style={styles.blurView}>
            <Text
              className="bg-black"
              style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
            >
              Imagen del Día
            </Text>
          </BlurView>
          <ImagenDelDia />
          <Text
            style={{
              color: "white",
              opacity: 0.8,
              marginVertical: 6,
              fontSize: 18,
              alignSelf: "flex-start",
            }}
          >
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
    alignItems: "center",
    zIndex: 2, // Contenido sobre el fondo
  },
  containerImage: {
    width: 350,
    backgroundColor: "transparent",
    zIndex: 2,
  },
});
