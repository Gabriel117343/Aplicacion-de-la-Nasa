import { View, Text, StyleSheet, Image } from "react-native";
import { Screen } from "../descripcion/Screen";

export default function InformacionNasa() {
  return (
    <Screen>
      <View style={{ paddingTop: 20 }}>
        <View style={styles.contenedorImagen}>
          <Image
            source={require("../../../assets/nasa-imagen.png")}
            style={styles.imagenNasa}
          />
        </View>

        <Text style={styles.text}>
          La NASA es la agencia del gobierno de los Estados Unidos responsable
          de la ciencia y tecnología relacionada con el aire y el espacio.
        </Text>
        <Text style={styles.text}>
          El programa espacial de la NASA incluye el lanzamiento de satélites y
          naves espaciales, la exploración de la Luna y Marte, y la
          investigación de la atmósfera y el clima de la Tierra.
        </Text>
        <Text style={styles.text}>
          La NASA también ha enviado astronautas al espacio en misiones
          tripuladas y ha desarrollado tecnologías para la exploración espacial.
        </Text>
        <Text style={styles.text}>
          La NASA fue fundada en 1958 y ha sido responsable de muchos logros
          importantes en la exploración espacial, incluido el aterrizaje en la
          Luna en 1969 y el lanzamiento del telescopio espacial Hubble en 1990.
        </Text>
        <Text style={styles.text}>
          La NASA también ha sido pionera en el desarrollo de tecnologías
          espaciales, como los cohetes Saturno V y el...
        </Text>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  contenedorImagen: {
    maxWidth: "100%",
    height: 200,
    borderWidth: 0.5,
    borderColor: "white",
    marginBottom: 30,
    overflow: "hidden",
    justifyContent: "center",
  },
  imagenNasa: {
    width: "100%",
    height: "100%",
  },
  text: { color: "white", fontSize: 18, paddingBottom: 10 },
});
