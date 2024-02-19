import { Image, Text, TextInput, TouchableNativeFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../Styles";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { CREATE_POST, GET_POSTS } from "../gql/post";
import { useMutation } from "@apollo/client";

export default function Post({ navigation }) {
  const [createPost, { data }] = useMutation(CREATE_POST, {
    refetchQueries: [
      GET_POSTS
    ]
  })
  const [input, setInput] = useState({
    content: '',
    tags: '',
    imgUrl: ''
  })
  const [err, setErr] = useState(null)

  function handleInput(key, value) {
    setInput({
      ...input,
      [key]: value
    })
  }

  useEffect(() => {
    if(data) {
      navigation.navigate("Home")
    }
  }, [data])
  
  return (
    <SafeAreaView style={{
      backgroundColor: 'white'
    }}>
      <View style={{
        backgroundColor: 'white',
        height: '100%'
      }}>
        <Header navigation={navigation}/>
        <View style={{
          padding: 25
        }}>
          <View style={{
            width: '25%',
            marginBottom: 25
          }}>
            <Image
              source={{
                uri: "https://images.squarespace-cdn.com/content/v1/60e4724ea746166606f95abb/806e3c79-2f44-4eaa-84ea-be7a82cefde2/LinkedIn-logo.png?format=1500w"
              }}
              style={{
                width: 'auto',
                height: 'auto',
                aspectRatio: '1500/844'
              }}
            />
          </View>
          <Text style={{
            fontSize: 28,
            fontWeight: '500'
          }}>Add post</Text>
          <View style={{
            marginTop: 20,
            marginBottom: 20
          }}>
            <Text style={{
              color: 'gray'
            }}>Content</Text>
            <TextInput onChangeText={(text) => {
              handleInput("content", text)
            }} />
            <View 
              style={{
                width: '100%',
                height: 1,
                backgroundColor: 'gray'
              }}
            />
          </View>
          <View style={{
            marginBottom: 20
          }}>
            <Text style={{
              color: 'gray'
            }}>Image URL</Text>
            <TextInput onChangeText={(text) => {
              handleInput("imgUrl", text)
            }}/>
            <View 
              style={{
                width: '100%',
                height: 1,
                backgroundColor: 'gray'
              }}
            />
          </View>
          <View style={{
            marginBottom: 20
          }}>
            <Text style={{
              color: 'gray'
            }}>Tags</Text>
            <TextInput onChangeText={(text) => {
              handleInput("tags", text)
            }}/>
            <View 
              style={{
                width: '100%',
                height: 1,
                backgroundColor: 'gray'
              }}
            />
          </View>
          <TouchableNativeFeedback onPress={async () => {
            try {
              const tags = input.tags.split(' ')
              await createPost({
                variables: {
                  post: {
                    content: input.content,
                    imgUrl: input.imgUrl,
                    tags
                  }
                }
              })
            } catch (error) {
              setErr(err.message)
            }
          }}>
            <Text style={{
              textAlign: 'center',
              backgroundColor: styles.primary.color,
              paddingVertical: styles.button.paddingVertical,
              borderRadius: styles.button.borderRadius,
              color: 'white',
              fontWeight: 'bold'
            }}>Continue</Text>
          </TouchableNativeFeedback>
          {err && <Text style={{
            marginTop: 20,
            color: styles.err.color
          }}>{err}*</Text>}
        </View>
      </View>
    </SafeAreaView>
  )
}