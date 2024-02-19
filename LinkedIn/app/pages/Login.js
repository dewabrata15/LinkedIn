import { Image, Text, TextInput, TouchableNativeFeedback, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../Styles";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../gql/user";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";

export default function Login({ navigation }) {
  const [login, { data, error, loading }] = useMutation(LOGIN)
  const { setToken } = useContext(LoginContext)
  const [input, setInput] = useState({
    email: '',
    password: ''
  })
  const [err, setErr] = useState(null)

  function handleInput(key, value) {
    setInput({
      ...input,
      [key]: value
    })
  }
  console.log(data, error, loading);

  async function goToHome(token) {
    await setToken(token)
  }

  useEffect(() => {
    if(data) {
      goToHome(data.login.access_token)
    }
  }, [data])

  return (
    <SafeAreaView style={{
      backgroundColor: 'white'
    }}>
      <View style={{
        padding: 25,
        backgroundColor: 'white',
        height: '100%'
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
        }}>Sign in</Text>
        <View style={{
          flexDirection: 'row'
        }}>
          <Text style={{
            marginEnd: 5
          }}>or</Text>
          <TouchableWithoutFeedback onPress={() => {
            navigation.navigate("Welcome")
          }}>
            <Text style={{
              color: styles.primary.color
            }}>Join now</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={{
          marginTop: 20,
          marginBottom: 20
        }}>
          <Text style={{
            color: 'gray'
          }}>Email</Text>
          <TextInput onChangeText={(text) => {
            handleInput("email", text)
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
          }}>Password</Text>
          <TextInput secureTextEntry={true} onChangeText={(text) => {
            handleInput("password", text)
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
            await login({
              variables: input
            })
          } catch (error) {
            setErr(error.message)
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
    </SafeAreaView>
  )
}