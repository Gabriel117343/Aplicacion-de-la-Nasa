import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
} from "react-native";

import getAllImages from "../api/nasaApi";
import { format, sub } from "date-fns"; // formateo de fetcha

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
          setDataNasa(data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    cargarData();
  });
  return (
    <View style={styles.container}>
      <View style={styles.fondoContainer} />
      <FlatList>
        data={dataNasa}
        keyExtractor={(data) => item.date}
        renderItem=
        {({ item }) => (
          <View style={styles.informacion}>
            <Text style={styles.title}>{item.title}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Text style={styles.date}>{item.date ?? "-"}</Text>

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
        )}
      </FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 110,

    borderRadius: 16,
    overflow: "hidden",
  },
  fondoContainer: {
    flex: 1,

    backgroundColor: "#0463c4",
    position: "relative",
    opacity: 0.4,
    borderRadius: 16,
    zIndex: 0,
  },
  title: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  informacion: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    padding: 15,
  },
  date: {
    color: "#fff",
    fontSize: 16,
  },
});
