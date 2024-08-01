
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  ScrollView,
  Animated
} from "react-native";
import React, { useEffect, useReducer, useRef } from 'react'
export const CardFiveImages = ({ data }) => {


  return (
    <View style={styles.informacion}>
      <View
        style={[styles.fondoContainer, StyleSheet.absoluteFillObject]}
      />
      <Text style={styles.title}>{data.title}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Text style={styles.date}>{data.date ?? "-"}</Text>
        <Pressable
          onPress={() => {}}
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
          {({ pressed }) => (
            <Text style={{ color: "white", textAlign: "center", fontSize: 14 }}>
              {pressed ? "Soltar" : "Ver"}
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  )
}

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
})

export const AnimatedCardFiveImages = ({ data, index }) =>{
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: index * 250,
      useNativeDriver: true
    }).start()
  }, [opacity, index])
  return (
    <Animated.View style={{ opacity }}>
      <CardFiveImages data={data} />
    </Animated.View>
  )
} 