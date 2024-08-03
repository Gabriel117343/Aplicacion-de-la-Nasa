import { Text, View } from 'react-native'
import { useLocalSearchParams  } from 'expo-router'
export default function Detail(){
  // se recupera la fecha de la URL
  const { date } = useLocalSearchParams()

  return (
    <View className="bg-white flex-1 items-center justify-center">
      <Text className="text-black" >Detail {date}</Text>
    </View>
  )
}