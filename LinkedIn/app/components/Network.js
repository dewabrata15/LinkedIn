import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "../Styles";
import { useMutation } from "@apollo/client";
import { FOLLOW } from "../gql/user";
import { useState } from "react";

export default function Network({ item, tab, navigation }) {
  const [followed, setFollowed] = useState(false)
  const [follow] = useMutation(FOLLOW)

  return (
    <View style={{
      backgroundColor: 'white',
      padding: 12
    }}>
      <View style={{
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        marginBottom: 15
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
          }}>{tab ? item.user.username : item.username}</Text>
          <Text style={{
            color: 'gray',
            fontSize: 12
          }}>{tab ? item.user.email : item.email}</Text>
        </View>
      </View>
      <View style={{
        flexDirection: 'row',
        gap: 10
      }}>
        <TouchableWithoutFeedback onPress={async () => {
          try {
            await follow({
              variables: {
                userId: tab ? item.user._id : item._id
              }
            })
            setFollowed(true)
          } catch (error) {
            setFollowed(true)
          }
        }}>
          <Text style={{
            backgroundColor: styles.primary.color,
            paddingVertical: styles.button.paddingVertical,
            borderRadius: styles.button.borderRadius,
            paddingHorizontal: 15,
            color: 'white',
            fontWeight: 'bold'
          }}>{followed ? "Followed" : "Follow"}</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {
          navigation.navigate("Profile", {
            myself: false,
            _id: tab ? item.user._id : item._id
          })
        }}>
          <Text style={{
            borderColor: "gray",
            borderWidth: 1,
            paddingVertical: styles.button.paddingVertical,
            borderRadius: styles.button.borderRadius,
            paddingHorizontal: 15,
            color: "gray",
            fontWeight: 'bold'
          }}>Details</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}