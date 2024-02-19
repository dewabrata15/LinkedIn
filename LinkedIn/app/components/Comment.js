import { Image, Text, View } from "react-native";

export default function Comment({ item }) {
  return (
    <View style={{
      marginHorizontal: 8,
      flexDirection: 'row',
      gap: 8
    }}>
      <View style={{
        width: 40,
        height: 40,
        borderRadius: 20,
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
      <View>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 16
        }}>{item.username}</Text>
        <Text style={{
          color: 'gray'
        }}>{item.content}</Text>
      </View>
    </View>
  )
}