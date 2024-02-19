import { Text, TouchableWithoutFeedback, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

export default function Header({ navigation }) {
  return (
    <TouchableWithoutFeedback onPress={() => {
      navigation.goBack()
    }}>
      <View style={{
        width: '20%',
        paddingHorizontal: 12,
        paddingVertical: 8,
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        backgroundColor: 'white'
      }}>
        <FontAwesome name="arrow-left" size={16} color="black" />
        <Text>Back</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}