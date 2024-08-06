import axios from "axios";
import Constants from "expo-constants";
import { NASA_API_KEY } from "@env"; // importa la variable de entorno API_KEY

const KEY =
  NASA_API_KEY ||
  Constants.expoConfig.extra.nasaApiKey ||
  process.env.NASA_API_KEY;

// Creación de una instancia de axios para acceder a la API de la NASA
const nasaAPI = axios.create({
  baseURL: "https://api.nasa.gov/planetary/apod",
  timeout: 10000,
});

// esta función puede o no recibir un parámetro opcional para obtener imágenes de la NASA con filtros
export default function getAllImages({ urlParams = "", keyIngresada }) {
  if (!KEY && !keyIngresada)
    return Promise.reject(new Error("Se espera una API Key de la NASA"));
  console.log('APi Ingresada:', !!keyIngresada);
  // el operador de coalesencia nula o Nullish coalescing operator (??) se utiliza para verificar si el valor de la variable es nulo o indefinido
  
  return nasaAPI.get(`?api_key=${keyIngresada ?? KEY}${urlParams ?? ""}`); // primero se le da importancia a la keyIngresada y luego a la KEY por defecto
}
