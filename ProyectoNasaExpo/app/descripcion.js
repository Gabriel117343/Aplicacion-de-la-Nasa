import { ScrollView, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { HomeIcon } from "../src/components/shared/Icons";

export default function Descripcion() {
  return (
    <ScrollView className="pt-14">
      <Link asChild href="/">
        <Pressable>
          {({ pressed }) => (
            <HomeIcon
              size={34}
              color="white"
              style={{ opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </Link>
      <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
        La NASA es la agencia del gobierno de los Estados Unidos responsable de
        la ciencia y tecnología relacionada con el aire y el espacio. El
        programa espacial de la NASA incluye el lanzamiento de satélites y naves
        espaciales, la exploración de la Luna y Marte, y la investigación de la
        atmósfera y el clima de la Tierra. La NASA también ha enviado
        astronautas al espacio en misiones tripuladas y ha desarrollado
        tecnologías para la exploración espacial. La NASA fue fundada en 1958 y
        ha sido responsable de muchos logros importantes en la exploración
        espacial, incluido el aterrizaje en la Luna en 1969 y el lanzamiento del
        telescopio espacial Hubble en 1990. La NASA también ha sido pionera en
        el desarrollo de tecnologías espaciales, como los cohetes Saturno V y el
      </Text>
    </ScrollView>
  );
}
