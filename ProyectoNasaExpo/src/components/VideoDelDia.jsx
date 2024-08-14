import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";

// Documentación > https://lonelycpp.github.io/react-native-youtube-iframe/component-ref-methods

export const VideoDelDia = ({ videoUrl }) => {
  
  // en caso de que la url sea un enlace a la página web de la NASA
  const [isLinkWebSite, setIsLinkWebSite] = useState(false);
  const videoId = videoUrl
    .replace("https://www.youtube.com/embed/", "")
    .replace("?rel=0", "");

  const playerRef = useRef(null);
  const onReady = () => {
    // Acceder a la duración del video una vez que esté listo para reproducirse
    playerRef.current?.getDuration().then((duration) => {
      console.log(duration);
      playerRef.current?.seekTo(0); // Se inicia el video desde el principio
    });
  };

  const onChangeState = (event) => {
    if (event === "ended") {
      playerRef.current?.seekTo(0); // Se reinicia el video al min 0 cuando termina
    }
  };

  // Detecta si la url es un enlace a la página web de la NASA y no un video de YouTube
  useEffect(() => {

    const patronYoutube = /https:\/\/www.youtube.com\/embed\//;
    const isLinkYoutube =  patronYoutube.test(videoUrl);
    if (!isLinkYoutube) {
      setIsLinkWebSite(true);
    }
  }, []);

  return isLinkWebSite ? (
    <NasaExternalLink url={videoUrl} />
  ) : (
    <YoutubeIframe
      height="100%"
      width="100%"
      ref={playerRef} // Acceso al Player Functions API de YouTube
      play={true}
      onReady={onReady}
      onChangeState={onChangeState}
      playerParams={{
        controls: 0, // Ocultar los controles del video
        showinfo: 0, // Ocultar la información del video

        fs: 0, // Ocultar el botón de pantalla completa
        rel: 0, // Ocultar los videos relacionados
      }}
      webViewStyle={{
        aspectRatio: 16 / 9, // Relación de aspecto 16:9 para
      }}
      videoId={videoId}
    />
  );
};
const NasaExternalLink = ({ url }) => {
  const fondoNasa = require("../../assets/nasa-imagen.png");
  return (
    <View style={styles.externalLinkContainer}>
      <Image
        source={fondoNasa}
        style={[
          StyleSheet.absoluteFillObject,
          { width: "100%", height: "100%", resizeMode: "cover" },
        ]}
      />

      <TouchableOpacity onPress={() => Linking.openURL(url)}>
        <Text style={styles.externalLinkText}>
          Click to open the video in the NASA website
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  externalLinkContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#000",
  },
  externalLinkText: {
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    borderRadius: 10,
    fontSize: 15,
    marginBottom: 20,
  },
});
