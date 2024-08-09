// components/BlurredImageWithLoading.jsx
import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View } from "react-native";
import { BlurView } from "expo-blur";
import Loading from "./Loading";
import { blurImages } from "../constants/blurImages";

const BlurredImageWithLoading = ({ startIndex = 0, endIndex = blurImages.length }) => {
  const [imagen, setImagen] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(null);

  const randomImageStatic = () => {
    // Selecciona una imagen aleatoria entre las importadas
    const imgMostrar = blurImages.slice(startIndex, endIndex);

    // en caso de que no se haya pasado un índice de inicio se selecciona una imagen aleatoria
    const random = Math.floor(Math.random() * imgMostrar.length) + startIndex;

    return { image: blurImages[random], index: random };
  };
  useEffect(() => {
    const getImagen = () => {
      const { image, index } = randomImageStatic();
 
      if (index === 0) {
        setAspectRatio("16/13");
      } else if (index >= 1 && index <= 2) {
        setAspectRatio("16/30");
      } else {
        setAspectRatio("16/15");
      }
      setImagen(image);
    };
    getImagen();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.fondoCarga}>
        <Loading />
      </View>
      {imagen && (
        <Image source={imagen} style={[styles.image, { aspectRatio: aspectRatio }]} />
      )}

      <BlurView
        tint="systemThinMaterialDark"
        intensity={40}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
};
export default BlurredImageWithLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },
  fondoCarga: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10, // Para que esté por encima de la imagen
  },

  image: {
    objectFit: "contain",
  },
});
