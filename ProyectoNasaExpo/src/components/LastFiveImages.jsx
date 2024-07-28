import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  ScrollView,
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
          renderItem={({ item }) => (
            <View style={styles.informacion}>
              <View
                style={[styles.fondoContainer, StyleSheet.absoluteFillObject]}
              />
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
                      backgroundColor: pressed ? "#9ca2ef" : "#7178df",
                      borderRadius: 7,
                      padding: 8,
                      width: 80,
                    },
                    styles.wrapperCustom,
                  ]}
                >
                  {({ pressed }) => (
                    <Text style={{ color: "white", textAlign: "center" }}>
                      {pressed ? "Soltar" : "Ver"}
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
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

  title: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  informacion: {
    marginTop: 10,
    width: "100%",
    height: 120,
    justifyContent: "space-between",
    padding: 15,
  },
  fondoContainer: {
    flex: 1,
    backgroundColor: "#5a61bd",
    opacity: 0.4,
    borderRadius: 16,
    zIndex: -1,
  },
  date: {
    color: "#fff",
    fontSize: 16,
  },
});
