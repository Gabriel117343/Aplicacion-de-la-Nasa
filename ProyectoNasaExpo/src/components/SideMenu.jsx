import React from "react";
import { View, StyleSheet, Pressable, Linking, Animated } from "react-native";
import { Drawer } from "react-native-paper";
import { MenuIcon } from "./shared/Icons";
import { useRouter } from "expo-router";

export const SideMenu = ({ visible, menuAnim, closeMenu }) => {
  const router = useRouter();

  return (
    visible && (
      <Animated.View
        style={[
          styles.drawerContainer,
          { transform: [{ translateX: menuAnim }] },
        ]}
      >
        <View style={[styles.fondoMenu, StyleSheet.absoluteFillObject]} />
        <View style={{ padding: 20, alignSelf: "flex-end" }}>
          <Pressable onPress={closeMenu}>
            <MenuIcon color="white" size={25} />
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
    zIndex: 1000,
    height: 800,
  },
  fondoMenu: {
    backgroundColor: "black",
    opacity: 0.8,
  },
});

export default SideMenu;
