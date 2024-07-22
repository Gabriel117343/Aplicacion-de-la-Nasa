import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
// Este es un componente de carga que se muestra mientras se cargan los datos.
const LoadingComponent = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text style={styles.text}>Loading...</Text>
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
  },
});
