import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Pressable, Linking, Animated } from "react-native";
import { Drawer } from "react-native-paper";
import { MenuIcon, CloseIcon } from "./shared/Icons";

import { useRouter } from "expo-router";

export const SideMenu = ({ visible, menuAnim, closeMenu }) => {
  const router = useRouter(); // Hook de navegación
  const rotateAnim = useRef(new Animated.Value(0)).current; // Nueva referencia para la rotación
  const [iconClose, setIconClose] = useState(false);

  const animacionRotacion = () => {
    const rotate = Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 0, // Rotar a 10 grados
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: -180, // Rotar a -10 grados
        duration: 300,
        useNativeDriver: true,
      }),
    ]);
    rotate.start(() => setIconClose(!iconClose));
  }
  useEffect(() => {
    animacionRotacion();
   
  }, []);
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [-10, 10],
    outputRange: ["-10deg", "10deg"],
  });
  return (
    visible && (
      <Animated.View
        style={[
          styles.drawerContainer,
          { transform: [{ translateX: menuAnim }] },
        ]}
      >
        <View style={[styles.fondoMenu, StyleSheet.absoluteFillObject]} />
        <View style={{ padding: 25, alignSelf: "flex-end", height: 80 }}>
          <Pressable onPress={() => {
            setIconClose(!iconClose);
            closeMenu();
          }}>
            <Animated.View
              style={{ transform: [{ rotate: rotateInterpolate }] }}
            >
              {iconClose ? (
                <CloseIcon color="white" size={34} />
              ) : (
                <MenuIcon color="white" size={25} />
              )}
            </Animated.View>
          </Pressable>
        </View>

        <Drawer.Section
          title="Menu"
          theme={{ colors: { onSurfaceVariant: "white" } }}
        >
          <Drawer.Item
            label="Home"
            icon="home"
            rippleColor="green"
            theme={{ colors: { onSurfaceVariant: "white" } }}
            onPress={() => {
              closeMenu();
              router.push("/");
            }}
          />
          <Drawer.Item
            label="Información"
            icon="information"
            theme={{ colors: { onSurfaceVariant: "white" } }}
            onPress={() => {
              closeMenu();
              router.push("/descripcion");
            }}
          />
          <Drawer.Item
            label="Web"
            icon="web"
            theme={{ colors: { onSurfaceVariant: "white" } }}
            onPress={() => {
              closeMenu();
              Linking.openURL("https://www.nasa.gov/es/");
            }}
          />
          <Drawer.Item
            label="noticias"
            icon="newspaper"
            theme={{ colors: { onSurfaceVariant: "white" } }}
            onPress={() => {
              closeMenu();
              Linking.openURL("https://ciencia.nasa.gov/");
            }}
          />
        </Drawer.Section>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 180,
    marginTop: -32,
    zIndex: 100,
    height: 800,
  },
  fondoMenu: {
    backgroundColor: "black",
    opacity: 0.8,
  },
});

export default SideMenu;
