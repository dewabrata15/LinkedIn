import { FlatList, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from '@expo/vector-icons';
import Header from "../components/Header";
import { useLazyQuery } from '@apollo/client'
import { SEARCH } from "../gql/user";
import { useEffect, useState } from "react";
import Network from "../components/Network";

export default function Search({ navigation }) {
  const [key, setKey] = useState('')
  const [networks, setNetworks] = useState([])
  const [search, { data }] = useLazyQuery(SEARCH, {
    variables: { search: key }
  })

  useEffect(() => {
    search()
  }, [key])

  useEffect(() => {
    if(data) {
      setNetworks(data.users)
    }
  }, [data])

  return (
    <SafeAreaView style={{
      backgroundColor: 'white'
    }}>
      <View style={{
        backgroundColor: '#F4F2EE',
        height: '100%'
      }}>
        <View style={{
          backgroundColor: 'white'
        }}>
          <Header navigation={navigation}/>
        </View>
        <View style={{
          flexDirection: 'row',
          backgroundColor: '#DDE7F1',
          alignItems: 'center',
          borderRadius: 5,
          paddingVertical: 8,
          paddingEnd: 8
        }}>
          <FontAwesome name="search" size={15} color="black" style={{
            padding: 8
          }}/>
          <TextInput style={{
            flex: 1
          }} onChangeText={(text) => {
            setKey(text)
          }}/>
        </View>
        <FlatList
          data={networks}
          renderItem={({item}) => <Network item={item} navigation={navigation} />}
          keyExtractor={item => item._id}
          contentContainerStyle={{
            gap: 10
          }}
        />
      </View>
    </SafeAreaView>
  )
}