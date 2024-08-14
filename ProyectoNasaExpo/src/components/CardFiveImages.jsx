import { StyleSheet, Text, View, Pressable, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { UpdateIcon } from "../components/shared/Icons";

export const CardFiveImages = ({ data }) => {
  const router = useRouter(); // hook para manejar la navegación

  return (
    <View style={styles.informacion}>
      <View style={[styles.fondoContainer, StyleSheet.absoluteFillObject]} />
      <Text style={styles.title}>{data.title}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <View style={{ flexDirection: "row", gap: 4 }}>
          <UpdateIcon size={19} color="white" style={{ opacity: 0.8 }} />
          <Text style={styles.date}>{data.date ?? "-"}</Text>
        </View>
        <Pressable
          onPress={() => router.push(`/${data.date}`)}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#8a91e6" : "#7178df",
              borderRadius: 7,
              padding: 8,
              width: 80,
            },
            styles.wrapperCustom,
          ]}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 14 }}>
            Ver
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  informacion: {
    marginTop: 10,
    width: "100%",
    height: 120,
    justifyContent: "space-between",
    padding: 15,
  },
  fondoContainer: {
    flex: 1,
    backgroundColor: "#5a61bd",
    opacity: 0.4,
    borderRadius: 16,
    zIndex: -1,
  },
  date: {
    color: "#fff",
    fontSize: 16,
  },
});

export const AnimatedCardFiveImages = ({ data, index }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: index * 250,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);
  return (
    <Animated.View style={{ opacity }}>
      <CardFiveImages data={data} />
    </Animated.View>
  );
};
