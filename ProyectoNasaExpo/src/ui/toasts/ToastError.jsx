import { React } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { ErrorIcon } from "../../components/shared/Icons";
export const ToastError = ({ title, message }) => {
  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeInUp}
      style={styles.container}
    >
      <View style={[StyleSheet.absoluteFillObject, styles.fondoContainer]} />
      <ErrorIcon color="white" size={30} />
      <View>
        <Text style={styles.title}>{title ?? "Ha ocurrido  un error"}</Text>
        <Text style={styles.text}>{message ?? "Error inesperado"}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 20,

    height: 70,

    alignSelf: "center",
    width: "90%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2F4F4F",
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    position: "absolute",
    zIndex: 100,
    gap: 10,
    overflow: "hidden",
  },
  fondoContainer: {
    backgroundColor: "#FF5347",
    opacity: 0.9,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    fontSize: 14,
    color: "#D3D3D3", // Blanco un poco más oscuro
  },
});
