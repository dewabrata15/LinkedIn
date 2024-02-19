import { FlatList, View } from "react-native";
import Post from "../components/Post";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import { useQuery } from '@apollo/client'
import { GET_POSTS } from "../gql/post";
import { useEffect, useState } from "react";

export default function Home({ navigation }) {
  const [posts, setPosts] = useState([])
  const { data, loading, error } = useQuery(GET_POSTS)

  console.log(loading,data, error);
  useEffect(() => {
    if(data) {
      setPosts(data.posts)
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
        <Navbar navigation={navigation}/>
        <FlatList
          data={posts}
          renderItem={({item}) => <Post item={item} navigation={navigation} />}
          keyExtractor={item => item._id}
          contentContainerStyle={{
            gap: 10
          }}
        />
      </View>
    </SafeAreaView>
  )
}