import { TextInput, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from '@expo/vector-icons';
import Header from "../components/Header";
import { useMutation } from "@apollo/client";
import { COMMENT_POST, GET_POST } from "../gql/post";
import { useEffect, useState } from "react";

export default function Comment({ navigation, route }) {
  const { _id } = route.params
  const [comment, { data }] = useMutation(COMMENT_POST, {
    refetchQueries: [
      GET_POST
    ]
  })
  const [input, setInput] = useState('')

  useEffect(() => {
    if(data) {
      navigation.goBack()
    }
  }, [data])
  return (
    <SafeAreaView>
      <View style={{
        height: '100%'
      }}>
        <Header navigation={navigation}/>
        <View style={{
          backgroundColor: '#DDE7F1',
          borderRadius: 5,
          padding: 8,
          margin: 8,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <TextInput style={{
            flex: 1
          }} onChangeText={(text) => {
            setInput(text)
          }}/>
          <TouchableWithoutFeedback onPress={async () => {
            try {
              if(!input) {
                throw new Error("No Content")
              } 
              await comment({
                variables: {
                  comment: {
                    content: input,
                    postId: _id
                  }
                }
              })
            } catch (error) {
              console.log(error)
            }
          }}>
            <FontAwesome name="arrow-circle-right" size={20} color="black" style={{
              marginStart: 8
            }} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  )
}