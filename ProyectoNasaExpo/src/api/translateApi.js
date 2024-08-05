import axios from "axios";
import { DEEPL_API_KEY } from "@env";


// esta función recibe un texto y un idioma al que se desea traducir
export default function translateText(text, targetLang) {
  return axios.post(`https://api-free.deepl.com/v2/translate?auth_key=${DEEPL_API_KEY}&text=${text}&target_lang=${targetLang}`
  );
}
