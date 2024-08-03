import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import getAllImages from "../api/nasaApi";
import { format, sub } from "date-fns"; // formateo de fecha
import { AnimatedCardFiveImages } from "./CardFiveImages";

export const LastFiveImages = () => {
  const [dataNasa, setDataNasa] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function cargarData() {
      try {
        const date = new Date(); // fecha de hoy
        // la fecha de hoy y la de hace 5 días
        const todaysDate = format(date, "yyyy-MM-dd");
        const fiveDaysAgoDate = format(sub(date, { days: 5 }), "yyyy-MM-dd");
        // se obtiene un Array de objetos con las imagenes de los últimos 5 días

        const data = await getAllImages(
          `&start_date=${fiveDaysAgoDate}&end_date=${todaysDate}`
        );

        if (data.data) {
          setDataNasa(data.data.toReversed());
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    cargarData();
  }, []);
  console.log({ datos: dataNasa });
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={{ color: "white", textAlign: "center" }}>Cargando...</Text>
      ) : (
        <FlatList
          data={dataNasa}
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
