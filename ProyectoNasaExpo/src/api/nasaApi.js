import Constants from 'expo-constants';
import axios from 'axios';

// Acceso a la clave API de la NASA de forma compatible con las últimas versiones de Expo
const API_KEY = Constants.expoConfig?.extra?.NASA_API_KEY || Constants.manifest?.extra?.NASA_API_KEY;

const nasaAPI = axios.create({
  baseURL: 'https://api.nasa.gov/planetary/apod'
});

export default function getAllImages (urlParams) {
  return nasaAPI.get(`?api_key=${API_KEY}${urlParams ?? ''}`);
  
}

