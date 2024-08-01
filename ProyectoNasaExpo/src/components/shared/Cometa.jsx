import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

export const Cometa = () => {
  const moveAnim = useRef(new Animated.Value(-100)).current; // Movimiento horizontal
  const verticalAnim = useRef(new Animated.Value(0)).current; // Movimiento vertical
  const rotateAnim = useRef(new Animated.Value(0)).current; // Rotación

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
  }, [moveAnim, verticalAnim, rotateAnim]);

  // Interpolación para rotación
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
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
      source={require("../../../assets/cometa-fondo.png")}
    />
  );
};

const styles = StyleSheet.create({
  cometa: {
    position: "absolute",
    left: 0, // Comienza fuera de la pantalla a la izquierda
    top: "50%", // Posición vertical en el medio de la pantalla
    width: 30,
    height: 30,
    zIndex: 1,
  },
});

