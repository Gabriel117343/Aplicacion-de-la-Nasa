// components/BlurredImageWithLoading.jsx
import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { BlurView } from 'expo-blur';
import Loading from './Loading';
import imagenEstrellas from '../../assets/galaxia-desenfocado.png';


const BlurredImageWithLoading = () => {
  return (
    <View style={styles.container}>
 
  
            <View style={styles.fondoCarga} >
              <Loading/>

            </View>
            <Image source={imagenEstrellas} style={styles.image} />
            <BlurView tint='systemThinMaterialDark' intensity={50} style={StyleSheet.absoluteFill} />


    </View>
  );
};
export default BlurredImageWithLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  fondoCarga: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Para que esté por encima de la imagen
  
  },

  image: {
    objectFit: "cover",
    aspectRatio: "1/1",
  },
})