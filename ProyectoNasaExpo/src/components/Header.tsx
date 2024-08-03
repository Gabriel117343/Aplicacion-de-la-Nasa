import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable, Linking } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MenuIcon } from "./shared/Icons";
import { Drawer } from "react-native-paper"; // Menu de opciones
import { useRouter } from 'expo-router'
export const Header = () => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const router = useRouter();
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#3f448C", "#6258df"]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.9, y: 0.2 }}
        style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
      >
        <View style={styles.leftContainer}>
          {!visible && (
            <Pressable onPress={openMenu}>
              <MenuIcon color="white" size={22} />
            </Pressable>
          )}

          {visible && (
            <View style={styles.drawerContainer}>
              <View style={[styles.fondoMenu, StyleSheet.absoluteFillObject]} />
              <View style={{ padding: 20, alignSelf: "flex-end" }}>
                <Pressable onPress={closeMenu}>
                  <MenuIcon color="white" size={25} />
                </Pressable>
              </View>

              <Drawer.Section
                title="Menu"
                theme={{ colors: { onSurfaceVariant: 'white' } }}
              >
                 <Drawer.Item
                  label="Home"
                  icon="home"
                  rippleColor="green"
                  theme={{ colors: { onSurfaceVariant: 'white' } }}
                  onPress={() => {
                    // Acción para Item 1
                    closeMenu();
                    router.push('/')
                  }}
                />
                <Drawer.Item
                  label="Información"
                  icon="information"
                  theme={{ colors: { onSurfaceVariant: 'white' } }}
                  onPress={() => {
                    // Acción para Item 1
                    closeMenu();
                    router.push('/descripcion')
                  }}
                />
                <Drawer.Item
                  label="Web"
                  icon="web"
                  theme={{ colors: { onSurfaceVariant: 'white' } }}
                  onPress={() => {
                    // Acción para Item 2
                    closeMenu();
                    Linking.openURL('https://www.nasa.gov/es/');
                  }}
                />
                <Drawer.Item
                  label="noticias"
                  icon="newspaper"
                  theme={{ colors: { onSurfaceVariant: 'white' } }}
                  onPress={() => {
                    // Acción para Item 3
                    closeMenu();
                    Linking.openURL('https://ciencia.nasa.gov/');
                  }}
                />
              </Drawer.Section>
            </View>
          )}
        </View>
        <View style={styles.rightContainer}>
          <Image
            source={require("../../assets/nasa-logo.png")}
            style={styles.image}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftContainer: {
    flex: 2,
    paddingLeft: 15,
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 15,
  },
  title: {
    color: "white",
    fontSize: 20,
  },
  image: {
    width: 60,
    height: 60,
  },
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
