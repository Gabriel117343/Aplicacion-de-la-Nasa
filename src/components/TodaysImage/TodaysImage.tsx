import React, {FC} from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import {PostImage} from '../../types';
const TodaysImage: FC<PostImage> = ({date, title, url}) => {
  // Ensure url is a string to satisfy the Image source prop type.

  return (
    <View style={styles.container}>
        <Image source={{uri: url}} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={() => console.log('Save')} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c449d',
    marginVertical: 16,
    borderRadius: 32,
    padding: 16,
    marginHorizontal: 24,
  },
  image: {
    width: '100%',
    height: 190,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 32,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginVertical: 12,
    fontWeight: 'bold',
  },
  date: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
});
export default TodaysImage;
