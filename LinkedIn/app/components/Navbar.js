import { Image, Text, TouchableNativeFeedback, TouchableWithoutFeedback, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

export default function Navbar({ navigation }) {
  return (
    <View style={{
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: 'white',
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center'
    }}>
      <TouchableWithoutFeedback onPress={() => {
        navigation.navigate("Profile", {
          myself: true
        })
      }}>
        <View style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          overflow: 'hidden'
        }}>
          <Image 
            source={{
              uri: 'https://media.licdn.com/dms/image/D5635AQGXW0U7XhrOLA/profile-framedphoto-shrink_400_400/0/1660002772504?e=1707591600&v=beta&t=RzeLmFDFEqHhNx7ArlDXuGp7bS7Y0YeSCBnpSVnxIm4'
            }}
            style={{
              width: '100%',
              aspectRatio: '1/1'
            }}
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableNativeFeedback onPress={() => {
        navigation.navigate("Search")
      }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#DDE7F1',
          alignItems: 'center',
          borderRadius: 5
        }}>
          <FontAwesome name="search" size={15} color="gray" style={{
            padding: 8
          }}/>
          <Text style={{
            color: 'gray',
            fontWeight: 'bold'
          }}>Search</Text>
        </View>
      </TouchableNativeFeedback>
      <FontAwesome name="commenting" size={20} color="gray" />
    </View>
  )
}