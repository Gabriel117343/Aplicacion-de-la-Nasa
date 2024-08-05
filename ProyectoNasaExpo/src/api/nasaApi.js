
import axios from 'axios';
import { NASA_API_KEY } from '@env' // importa la variable de entorno API_KEY

console.log(NASA_API_KEY)
// Creación de una instancia de axios para acceder a la API de la NASA
const nasaAPI = axios.create({
  baseURL: 'https://api.nasa.gov/planetary/apod'
});

// esta función puede o no recibir un parámetro opcional para obtener imágenes de la NASA con filtros
export default function getAllImages (urlParams) {
  console.log(urlParams)
  // el operador de coalesencia nula o Nullish coalescing operator (??) se utiliza para verificar si el valor de la variable es nulo o indefinido
  return nasaAPI.get(`?api_key=${NASA_API_KEY}${urlParams ?? ''}`);
  
}

