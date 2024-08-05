import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { HomeIcon } from "../shared/Icons";

import { BlurView } from "expo-blur";
import { Link } from "expo-router";

export const Header = () => {
  return (
    <View style={styles.container}>
      <BlurView intensity={15} t style={StyleSheet.absoluteFill} />
      <View style={styles.left}>
        <Link asChild href="/">
          <Pressable>
            {({ pressed }) => (
              <HomeIcon
                size={34}
                color="white"
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "flex-left",
    height: 60,
    justifyContent: "center",
    minWidth: "100%",
  },
  left: {
    paddingLeft: 20,
  },
});
