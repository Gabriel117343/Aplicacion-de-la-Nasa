import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
export const Header = () => {
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
          <Text style={styles.title}>Aplicación de la NASA</Text>
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
