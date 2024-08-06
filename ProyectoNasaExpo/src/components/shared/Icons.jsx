import FontAwesome from '@expo/vector-icons/FontAwesome'; // home
import Fontisto from '@expo/vector-icons/Fontisto'; // fecha
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // update, key
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'; // Menu


// Iconos de la librería expo-vector-icons
export const HomeIcon = (props) => (

  <FontAwesome name="home" {...props} />
)
export const DateIcon = (props) => (
  
    <Fontisto name="date" {...props} />
)
export const UpdateIcon = (props) => (
  
    <MaterialIcons name="update" {...props} />
)

export const MenuIcon = (props) => (
  
    <SimpleLineIcons name="menu" {...props} />
)
export const CloseIcon = (props) => (
  
    <MaterialIcons name="close" {...props} />
)
export const KeyIcon = (props) => (
  
    <MaterialIcons name="vpn-key" {...props} />
)
// tambien se podrían agregar SVG 