import React, { useState, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Pressable,

  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MenuIcon } from "./shared/Icons";

import { SideMenu } from './SideMenu'
export const Header = () => {
  const [visible, setVisible] = useState(false);
  const menuAnim = useRef(new Animated.Value(-200)).current; // para que comience oculto el menú lateral y pueda ser animado

  const openMenu = () => {
    setVisible(true)
    Animated.timing(menuAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
    // .star(() => setVisible(true)) > esto no es el comportamiento deseado porque que tiene que ser visible antes de la animación
  };
  const closeMenu = () => {
    Animated.timing(menuAnim, {
      toValue: -200,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisible(false));; // Callback que se ejecuta después de que la animación ha terminado
  };


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
            <SideMenu visible={visible} menuAnim={menuAnim} closeMenu={closeMenu} />
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


});
