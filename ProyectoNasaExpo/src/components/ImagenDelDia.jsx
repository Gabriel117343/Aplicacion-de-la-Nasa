import { StyleSheet, Text, Image, Pressable, View } from "react-native";
import React, { useEffect, useState } from "react";
import getAllImages from "../api/nasaApi";
import { BlurView } from "expo-blur";
export const ImagenDelDia = () => {
  const [loading, setLoading] = useState("");
  const [dataNasa, setDataNasa] = useState([]);
  useEffect(() => {
    async function cargarData() {
      try {
        // Código para cargar la imagen
        const data = await getAllImages();
        setDataNasa(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    cargarData();
  }, []);
  return (
    <View style={styles.containerImage}>
      <View style={styles.container}>
        <BlurView intensity={20} style={StyleSheet.absoluteFill} />
        <Image fadeDuration={2000} source={{ uri: dataNasa.url }} style={styles.image} />
        <Text style={styles.title}>{dataNasa.title}</Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.date}>{dataNasa.date}</Text>
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "red" : "blue",
                borderRadius: 7,
                padding: 8,
              },
              styles.wrapperCustom,
            ]}
          >
            {({ pressed }) => (
              <Text style={{ color: "white" }}>
                {pressed ? "Soltar" : "Presionar"}
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerImage: {
    width: 350,
    backgroundColor: "transparent",
    zIndex: 1,
  },

  container: {
    backgroundColor: "#2c449d",
    marginVertical: 16,
    borderRadius: 32,
    padding: 16,
    marginHorizontal: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 190,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 32,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    marginVertical: 12,
    fontWeight: "bold",
  },
  date: {
    color: "#fff",
    fontSize: 16,
  },
});
