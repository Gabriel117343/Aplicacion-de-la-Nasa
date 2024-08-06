
import axios from 'axios';
import Constants from 'expo-constants';
import { NASA_API_KEY } from '@env' // importa la variable de entorno API_KEY

const KEY = NASA_API_KEY || Constants.expoConfig.extra.nasaApiKey || process.env.NASA_API_KEY

// Creación de una instancia de axios para acceder a la API de la NASA
const nasaAPI = axios.create({
  baseURL: 'https://api.nasa.gov/planetary/apod',
  timeout: 8000
});

// esta función puede o no recibir un parámetro opcional para obtener imágenes de la NASA con filtros
export default function getAllImages (urlParams) {
  if (!KEY) return Promise.reject(new Error('Se espera una API Key de la NASA'));
  
  // el operador de coalesencia nula o Nullish coalescing operator (??) se utiliza para verificar si el valor de la variable es nulo o indefinido
  return nasaAPI.get(`?api_key=3pfYfYCvd0sfTMHU7dz3hS1vE5DLsvSGvWjFCnyn${urlParams ?? ''}`);
  
}

