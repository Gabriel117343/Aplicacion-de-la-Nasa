import React, { useRef } from "react";

import YoutubeIframe from "react-native-youtube-iframe";

// Documentación > https://lonelycpp.github.io/react-native-youtube-iframe/component-ref-methods

export const VideoDelDia = ({ videoUrl }) => {
  const videoId = videoUrl
    .replace("https://www.youtube.com/embed/", "")
    .replace("?rel=0", "");

  const playerRef = useRef(null);
  const onReady = () => {
    // Acceder a la duración del video una vez que esté listo para reproducirse
    playerRef.current?.getDuration().then((duration) => {
      console.log(duration)
      playerRef.current?.seekTo(0); // Se inicia el video desde el principio
    });
  };

  const onChangeState = (event) => {
    if (event === "ended") {
      playerRef.current?.seekTo(0); // Se reinicia el video al min 0 cuando termina
    }
  };

  return (
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
