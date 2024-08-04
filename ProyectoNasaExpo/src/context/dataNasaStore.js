
import { create } from 'zustand';

// Store para almacenar los datos de la API de la NASA
const useDataNasaStore =  create((set) => ({

  data: [],
  setData: (newData) => set({ data: newData }),
}))

export default useDataNasaStore;