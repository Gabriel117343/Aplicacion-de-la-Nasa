
import { nasaAPI } from "../api/nasaApi";
export const usePing = () => {

  const validateKeyNasa = async (key) => {
    try {
      const response = await nasaAPI.get(`?api_key=${key}`);
      if (response.status === 200 || response.ok) {
        return {
          success: true,
          message: "La API Key ingresada es correcta!",
        };
      } else if (response.status === 403) {
        return {
          success: false,
          message: "La API Key ingresada es invalida!",
        };
      } else {
        return {
          success: false,
          message: "Error desconocido al validar la API Key.",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "No se ha podido validar la API Key.",
      };
    }
  };

  return { validateKeyNasa };
}; 
