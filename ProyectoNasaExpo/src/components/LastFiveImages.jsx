import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import getAllImages from "../api/nasaApi";
import { format, sub } from "date-fns"; // formateo de fecha
import { AnimatedCardFiveImages } from "./CardFiveImages";
import useDataNasaStore from "../context/dataNasaStore";
import useApiKey from '../hooks/useApiKey';

export const LastFiveImages = () => {
  // hook para manejar el estado de la data de la API de la NASA
  const dataNasa = useDataNasaStore((state) => state.data);
  const setDataNasa = useDataNasaStore((state) => state.setData);
  const [isLoading, setIsLoading] = useState(true);

  const date = new Date(); // fecha de hoy

  const todaysDate = format(date, "yyyy-MM-dd");
  const fiveDaysAgoDate = format(sub(date, { days: 5 }), "yyyy-MM-dd");
  const keyGuardada = useApiKey(); // si no se ha guardado una API Key se obtiene null

  useEffect(() => {
    async function cargarData() {
      try {
        // se obtiene un Array de objetos con las imagenes de los 
        
        const data = await getAllImages({ urlParams: `&start_date=${fiveDaysAgoDate}&end_date=${todaysDate}`, keyIngresada: keyGuardada });

        if (data.data) {
          setDataNasa(data.data.toReversed()); // toRevesed crea una copia superficial del array y lo invierte

          setIsLoading(false);
        }
      } catch (error) {
        if (error.response) {
          throw new Error(error?.response?.data?.error ?? "Error en la petición");
        } else {
          console.error(error);
          throw new Error(error ?? "No se pudo cargar la información de la NASA");
        }
      }
    }
    cargarData();
  }, [keyGuardada]); // se ejecuta cada vez que se cambia la API Key

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={{ color: "white", textAlign: "center" }}>Cargando...</Text>
      ) : (
        <FlatList
          data={dataNasa.filter((item) => item.date !== todaysDate)}
          keyExtractor={(item) => item.date}
          renderItem={({ item, index }) => (
            <AnimatedCardFiveImages data={item} index={index} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
});
