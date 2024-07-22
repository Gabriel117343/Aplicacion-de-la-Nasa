import React, {useEffect, useState} from 'react';
import {Header} from '../components/Header';
import {View, StyleSheet} from 'react-native';
import fetchApi from '../api/fetch';

import {TodaysImage} from '../components/TodaysImage';
import {PostImage} from '../types';
import Loading from '../components/Loading';
import {LastFiveDaysImages} from '../components/LastFiveDaysImages';
import {format, sub} from 'date-fns'; // formateo de fetcha
export default function Home() {
  const [todaysImage, setTodaysImage] = useState<PostImage>();
  const [lastFiveDaysImages, setLastFiveDaysImages] = useState<PostImage[]>([]);

  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [isLoadingLastFiveDays, setIsLoadingLastFiveDays] = useState(true);
  useEffect(() => {
    async function loadTodayImage() {
      try {
        const todaysImageResponse = await fetchApi('');
        setTodaysImage(todaysImageResponse);
        setIsLoadingImage(false);
      } catch (error) {
        console.error(error);
        setTodaysImage({});
      }
    }
    const loadLast5DaysImages = async () => {
      try {
        const date = new Date();
        // la fecha de hoy y la fecha de hace 5 dias
        const todaysDate = format(date, 'yyyy-MM-dd');
        const fiveDaysAgoDate = format(sub(date, {days: 5}), 'yyyy-MM-dd');
        // se obtiene un arreglo de objetos con las imagenes de los ultimos 5 dias
        const lastFiveDaysImagesResponse = await fetchApi(
          `&start_date=${fiveDaysAgoDate}&end_date=${todaysDate}`,
        );
        setLastFiveDaysImages(lastFiveDaysImagesResponse);
        setIsLoadingLastFiveDays(false);
      } catch (error) {
        console.error(error);
      }
    };
    loadTodayImage().catch(null);
    loadLast5DaysImages().catch(null);
  }, []);
  console.log(todaysImage);
  console.log(lastFiveDaysImages);
  return (
    <View style={styles.container}>
      <Header />
      {isLoadingImage ? <Loading /> : <TodaysImage {...todaysImage} />}
      {isLoadingLastFiveDays ? (
        <Loading />
      ) : (
        <LastFiveDaysImages postImages={lastFiveDaysImages} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
