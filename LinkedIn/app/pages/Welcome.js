import { Image, Text, TouchableNativeFeedback, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../Styles";

export default function Welcome({ navigation }) {
  return (
    <SafeAreaView style={{
      backgroundColor: 'white'
    }}>
      <View style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
        gap: 25,
        backgroundColor: 'white'
      }}>
        <View style={{
          width: '50%'
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
          fontSize: 18,
          fontWeight: '300',
          textAlign: 'center'
        }}>Join a trusted community of 800M proffesionals</Text>
        <View style={{
          marginTop: 25,
          width: '100%',
          gap: 15
        }}>
          <TouchableNativeFeedback onPress={() => {
            navigation.navigate("Register")
          }}>
            <View style={{
              width: '100%',
              paddingVertical: 8,
              backgroundColor: styles.primary.color,
              borderRadius: 20
            }}>
              <Text style={{
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}>Join now</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableWithoutFeedback onPress={() => {
            navigation.navigate("Login")
          }}>
            <Text style={{
              color: styles.primary.color,
              textAlign: 'center'
            }}>Sign in</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  )
}