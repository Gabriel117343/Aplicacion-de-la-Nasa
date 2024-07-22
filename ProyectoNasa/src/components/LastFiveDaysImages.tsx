import React, {FC} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {PostImage as PostImageTypes} from '../types';
import {PostImage} from './PostImage';

// Definir una interfaz para las props
interface LastFiveDaysImagesProps {
  postImages?: PostImageTypes[];
}
export const LastFiveDaysImages: FC<LastFiveDaysImagesProps> = ({
  postImages,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last five Days</Text>
      <ScrollView style={styles.content}>
        {postImages?.map(postImage => (
          <PostImage key={`post-image-${postImage.title}`} {...postImage} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 8,
  },
  content: {
    paddingHorizontal: 24,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 18,
  },
});
