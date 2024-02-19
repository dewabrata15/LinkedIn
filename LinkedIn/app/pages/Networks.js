import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Network from "../components/Network";
import Navbar from "../components/Navbar";
import { useLazyQuery } from '@apollo/client'
import { USER } from "../gql/user";
import { useEffect } from "react";

export default function Networks({ navigation }) {
  const [user, { data }] = useLazyQuery(USER, {
    variables: {
      myself: true
    },
    fetchPolicy: 'no-cache'
  })

  useEffect(() => {
    user()
  }, [])

  return (
    <SafeAreaView style={{
      backgroundColor: 'white'
    }}>
      <View style={{
        backgroundColor: '#F4F2EE',
        height: '100%'
      }}>
        <Navbar navigation={navigation}/>
        {data && <FlatList
          data={data.user.follower}
          renderItem={({item}) => <Network item={item} tab={true} navigation={navigation}/>}
          keyExtractor={item => item}
          contentContainerStyle={{
            gap: 10
          }}
        />}
      </View>
    </SafeAreaView>
  )
}