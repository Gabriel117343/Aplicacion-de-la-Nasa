import { StyleSheet, Text, Image, Pressable, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import getAllImages from "../api/nasaApi";
import { VideoDelDia } from "./VideoDelDia";
import BlurredImageWithLoading from "../ui/BlurredImageWithLoading";
import { DateIcon } from "../components/shared/Icons";
import useApiKey from "../hooks/useApiKey";
import { toast } from 'react-native-toast-lite'
export const ImagenDelDia = () => {
  // solo se utiliza para presentación por lo que no se guarda en el estado global
  const [dataNasa, setDataNasa] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const keyGuardada = useApiKey(); // si no se ha guardado una API Key se obtiene null
  const router = useRouter(); // hook para manejar la navegación

  useEffect(() => {
    if (dataNasa.length > 0) return; // si ya se cargó la data no se vuelve a cargar
    async function cargarData() {
      try {
        const data = await getAllImages({
          urlParams: "",
          keyIngresada: keyGuardada,
        });
        // en caso de que se haya obtenido la data de la API se setea el estado
        if (data.data) {
          setDataNasa(data.data);
          setIsLoading(false);
        }
      } catch (error) {
        toast.error('Error al cargar la información de la NASA', { title: 'Error' })
        if (error.response) {
          throw new Error(
            error?.response?.data?.error ?? "Error en la petición"
          );
        } else {
          console.error(error);
          throw new Error(
            error ?? "No se pudo cargar la información de la NASA"
          );
        }
      }
    }
    cargarData();
  }, []);
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
              <BlurredImageWithLoading endIndex={2} />
            </>
          )}
        </View>
        {}
        <Text style={[styles.title, !!isLoading && { textAlign: "center" }]}>
          {dataNasa.title ?? "Cargando..."}
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <DateIcon size={17} color="white" />
            <Text style={styles.date}>{dataNasa.date ?? "-"}</Text>
          </View>

          <Pressable
            onPress={() => {
              router.push(`${dataNasa.date}`); // se navega a la ruta con la fecha de la imagen
            }}
            disabled={isLoading} // se deshabilita el botón si isLoading es true
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#63a4ff" : "#1e90ff",
                borderRadius: 7,
                padding: 8,
                width: 80,
              },
              styles.wrapperCustom,
            ]}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",

                fontSize: 14,
              }}
            >
              Ver
            </Text>
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
