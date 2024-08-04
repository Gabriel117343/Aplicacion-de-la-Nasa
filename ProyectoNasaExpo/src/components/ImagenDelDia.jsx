import { StyleSheet, Text, Image, Pressable, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import getAllImages from "../api/nasaApi";
import { VideoDelDia } from "./VideoDelDia";
import BlurredImageWithLoading from "../ui/BlurredImageWithLoading";
import { DateIcon } from '../components/shared/Icons'

import useDataNasaStore from '../context/dataNasaStore'
export const ImagenDelDia = () => {
  // hook para manejar el estado de la data de la API de la NASA
  const dataNasa = useDataNasaStore((state) => state.data);
  const setDataNasa = useDataNasaStore((state) => state.setData);

  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter(); // hook para manejar la navegación
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
  console.log(imagenNasa);


  return (
    <View style={styles.container}>
      <View style={styles.fondoContainer} />

      <View style={styles.informacion}>
        <View style={styles.containerImg}>
          {imagenNasa ? (
            dataNasa.media_type === "video" ? (
              <VideoDelDia videoUrl={dataNasa.url} />
            ) : (
              <Image
                fadeDuration={2000}
                source={{ uri: dataNasa.url }}
                style={styles.image}
              />
            )
          ) : (
            <>
              <BlurredImageWithLoading />
            </>
          )}
        </View>
        {}
        <Text style={[styles.title, !!isLoading && { textAlign: "center" }]}>
          {dataNasa.title ?? "Cargando..."}
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", gap: 8 }}>
      
            <DateIcon size={17} color="white"/>
            <Text style={styles.date}>{dataNasa.date ?? "-"}</Text>
          </View>
         
       
            <Pressable
              onPress={() => {router.push(`/${dataNasa.date}`)}}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#63a4ff" : "#1e90ff",
                  borderRadius: 7,
                  padding: 8,
                  width: 80,
            
                },
                styles.wrapperCustom
          
              ]}
            >
              {({ pressed }) => (
               
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "bold",

                    fontSize: 14,
                  }}
                >
            
                  {pressed ? "Soltar" : "Ver"} 
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

    backgroundColor: "#7178df",
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
    borderWidth: 1.5,
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
