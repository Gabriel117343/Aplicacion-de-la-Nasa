import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import useDataNasaStore from "../../context/dataNasaStore";
import { BlurredImageWithLoading } from "../../ui/BlurredImageWithLoading";
import { DateIcon } from '../shared/Icons'
import { Header } from './Header'

export const Descripcion = () => {
  const dataNasa = useDataNasaStore((state) => state.data);

  return (
    <View className="pt-14" style={styles.container}>
      <Header />
      <View className="bg-white flex-1 items-center justify-center">
        <Text style={styles.title}>{dataNasa.title} <Text style={{ fontSize: 15, color: '#FFFF00' }}>- HD</Text></Text>
        <View style={styles.containerImg}>
          {dataNasa.hdurl ? (
            dataNasa.media_type === "video" ? (
              <VideoDelDia videoUrl={dataNasa.url} />
            ) : (
              <Image
                fadeDuration={2000}
                source={{ uri: dataNasa.hdurl }}
                style={styles.image}
              />
            )
          ) : (
            <>
              <BlurredImageWithLoading />
            </>
          )}
        </View>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 15 }}>
          <DateIcon size={19} color="white" style={{ opacity: 0.8 }} />
          <Text style={styles.date}>{dataNasa.date ?? "-"}</Text>
        </View>

        <Text style={styles.descripcion}>
          Descripción: {dataNasa.explanation}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 0.5,
    paddingHorizontal: 20,
    backgroundColor: "black",
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
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "white",
    overflow: "hidden",
    justifyContent: "center",
   
  },
  image: {
    aspectRatio: "15/10"
  },
  descripcion: {
    color: "white",
    fontSize: 16,
  },
  date: {
    color: "white",
    fontSize: 16,
  }
});
