import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Jobs() {
  return (
    <SafeAreaView style={{
      backgroundColor: 'white'
    }}>
      <View style={{
        backgroundColor: '#F4F2EE',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text>No Jobs</Text>
      </View>
    </SafeAreaView>
  )
}