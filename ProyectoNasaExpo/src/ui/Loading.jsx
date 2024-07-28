import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
// Este es un componente de carga que se muestra mientras se cargan los datos.
const LoadingComponent = ({text}) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="white" />
    {text && <Text style={styles.text}>{text}</Text>}
  </View>
);

export default LoadingComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 16,
    color: 'white',
  },
});
