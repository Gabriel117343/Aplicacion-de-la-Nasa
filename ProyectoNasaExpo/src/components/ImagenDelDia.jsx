import { StyleSheet, Text, Image, Pressable, View } from "react-native";
import React, { useEffect, useState } from "react";
import getAllImages from "../api/nasaApi";

import BlurredImageWithLoading from "../ui/BlurredImageWithLoading";
export const ImagenDelDia = () => {

  const [dataNasa, setDataNasa] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function cargarData() {
      try {
        const data = await getAllImages();
        // en caso de que se haya obtenido la data de la API se setea el estado
        if (data.data) {
          setDataNasa(data.data);
          setIsLoading(false);
        }
        
      } catch (error) {
        console.log(error);
      }
    }
    cargarData();
  }, []);
  // precarga de la imagen de la API de la NASA, si es que ya se obtuvo la data
  const imagenNasa = !isLoading ? dataNasa.url : null;
  return (
    <View style={styles.container}>
      <View style={styles.fondoContainer} />

      <View style={styles.informacion}>
        <View style={styles.containerImg}>
          {imagenNasa ? (
            <Image
              fadeDuration={2000}
              source={{ uri: dataNasa.url }}
              style={styles.image}
            />
          ) : (
            <>
              <BlurredImageWithLoading />
            </>
          )}
        </View>
        {}
        <Text style={[styles.title, !!isLoading && { textAlign: 'center' }]}>{dataNasa.title ?? "Cargando..."}</Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.date}>{dataNasa.date ?? "-"}</Text>

          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "red" : "blue",
                borderRadius: 7,
                padding: 8,
                width: 80,
              },
              styles.wrapperCustom,
            ]}
          >
            {({ pressed }) => (
              <Text style={{ color: "white", textAlign: "center" }}>
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
  container: {
    width: 350,
    backgroundColor: "transparent",
    zIndex: 1,
    position: "relative",
  },
  fondoContainer: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    
    backgroundColor: '#0463c4',
    borderRadius: 32,
    alignItems: "center",
    aspectRatio: "1/1",
    resizeMode: "contain",
    opacity: 0.6,
    zIndex: 0,
    borderColor: "white",
    borderWidth: 0.7,
  },
  informacion: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    overflow: "hidden",
  },
  containerImg: {
    backgroundColor: "transparent",
    width: "100%",
    height: 190,
    opacity: 1,
    zIndex: 1,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 32,
    overflow: "hidden",
    justifyContent: "center",
  },
  image: {
    objectFit: "cover",
    aspectRatio: "1/1",
  },
  titleImg: {
    color: "#f8f8ff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 1,
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
