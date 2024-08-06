import axios from "axios";
import { DEEPL_API_KEY } from "@env";
import Constants from 'expo-constants';


const KEY = DEEPL_API_KEY || Constants.expoConfig.extra.deeplApiKey || process.env.DEEPL_API_KEY;
// esta función recibe un texto y un idioma al que se desea traducir
export default function translateText(text, targetLang) {

  if (!KEY) return Promise.reject(new Error('Se espera una API Key de DeepL'));

  return axios.post(`https://api-free.deepl.com/v2/translate?auth_key=${KEY}&text=${text}&target_lang=${targetLang}`,
    { timeout: 8000 } // se establece un tiempo de espera de 8 segundos
  );
}
