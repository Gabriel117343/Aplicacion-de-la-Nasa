import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import useDataNasaStore from "../../context/dataNasaStore";
import { BlurredImageWithLoading } from "../../ui/BlurredImageWithLoading";
import { DateIcon } from "../shared/Icons";

import { VideoDelDia } from "../VideoDelDia";

import { Screen } from "./Screen";
export const Descripcion = ({ date }) => {
  // Información del estado global de la aplicación
  const dataNasa = useDataNasaStore((state) => state.data);
  const dataNasaFiltrado = dataNasa?.find((item) => item.date === date);
  
  // Divide el texto en párrafos
  const paragraphs = dataNasaFiltrado?.explanation ? dataNasaFiltrado.explanation.split(".") : [];
  paragraphs.pop() // se elimina el último elemento resultante de split, que es un string vacío



  return (
    <Screen>
      <View className="bg-white flex-1 items-center justify-center">
        <Text style={styles.title}>
          {dataNasaFiltrado?.title}{" "}
          <Text style={{ fontSize: 15, color: "#FFFF00" }}>- HD</Text>
        </Text>
        <View style={styles.containerImg}>
          {dataNasaFiltrado ? (
            dataNasaFiltrado.media_type === "video" ? (
              <VideoDelDia videoUrl={dataNasaFiltrado.url} />
            ) : (
              <Image
                fadeDuration={1500}
                source={{ uri: dataNasaFiltrado.hdurl }}
                style={styles.image}
              />
            )
          ) : (
      
              <BlurredImageWithLoading />

          )}
        </View>

        <View style={{ flexDirection: "row", gap: 8, marginBottom: 15 }}>
          <DateIcon size={19} color="white" style={{ opacity: 0.8 }} />
          <Text style={styles.date}>{dataNasaFiltrado?.date ?? "-"}</Text>
        </View>

        <View >
          {paragraphs.map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>
            {paragraph}.
            </Text>
          ))}
        </View>
      </View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  fondo: {
    flex: 1,

    zIndex: 0,
  },
  container: {
    flex: 1,
    marginHorizontal: 0.5,
    paddingHorizontal: 20,

    paddingBottom: 120,
  },

  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
    paddingTop: 10,
  },
  containerImg: {
    maxWidth: "100%",
    height: 200,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "white",
    overflow: "hidden",
    justifyContent: "center",
  },
  image: {
    aspectRatio: "15/10",
  },
 
  paragraph: {
    marginBottom: 10,
    fontSize: 16,
    color: "white",
  },
  date: {
    color: "white",
    fontSize: 16,
  },
});
