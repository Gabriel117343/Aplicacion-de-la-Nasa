import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Button, Pressable } from "react-native";
import useDataNasaStore from "../../context/dataNasaStore";
import { BlurredImageWithLoading } from "../../ui/BlurredImageWithLoading";
import { DateIcon } from "../shared/Icons";

import { VideoDelDia } from "../VideoDelDia";
import translateText from "../../api/translateApi";
import { Screen } from "./Screen";

export const Descripcion = ({ date }) => {
  // Información del estado global de la aplicación
  const dataNasa = useDataNasaStore((state) => state.data);
  const dataNasaFiltrado = dataNasa?.find((item) => item.date === date);
  const [dataNasaTraducido, setDataNasaTraducido] = useState(null);
  const [paragraphs, setParagraphs] = useState([]);

  const [loadingTraduccion, setLoadingTraduccion] = useState(false);
  const [mostrarTraduccion, setMostrarTraduccion] = useState(false);
  const separarEnParrafos = (texto) => {

    if (!texto) return;
    // Divide el texto en párrafos
    const newParagraphs = texto?.split(".");
    newParagraphs.pop(); // se elimina el último elemento resultante de split, que es un string vacío
    setParagraphs(newParagraphs);
  };

  const traducir = async () => {
    if (!dataNasaTraducido) {
      setLoadingTraduccion(true);
      try {
        // traducir el texto de la descripción a español
        const response = await translateText(
          dataNasaFiltrado?.explanation,
          "ES"
        );
        if (response.data) {
          const texto = response.data.translations[0].text;
          setDataNasaTraducido(texto);
        }
      } catch (error) {
        if (error.response) {
          throw new Error(error?.response?.data?.error ?? "Error en la petición");
        } else {
          console.error(error);
          throw new Error(error ?? "Hubo un error al traducir la descripción");
        }

      } finally {
        setLoadingTraduccion(false);
      }
    }
    setMostrarTraduccion(!mostrarTraduccion); // se alterna el estado de mostrar traducción
  };

  useEffect(() => {
    // se actualiza el texto a mostrar en la descripción
    const cambiarTextoMostrado = () => {
      if (!mostrarTraduccion) {
        separarEnParrafos(dataNasaFiltrado?.explanation);
      } else {
        separarEnParrafos(dataNasaTraducido);
      }
    };
    cambiarTextoMostrado();
  }, [mostrarTraduccion, dataNasaFiltrado]);

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

        <Pressable
          onPress={traducir}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#8a91e6" : "#00008B",
              borderRadius: 7,
              padding: 8,
              width: 80,
              borderColor: "#8a91e6",
              borderWidth: 1,
              opacity: !!loadingTraduccion ? 0.5 : 1,
            },
            styles.wrapperCustom,
          ]}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 14 }}>
            Traducir
          </Text>
        </Pressable>
        <View style={{ marginTop: 20 }}>
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
