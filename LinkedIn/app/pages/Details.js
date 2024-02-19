import { FlatList, ScrollView, Text, TextInput, TouchableNativeFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useQuery } from '@apollo/client'
import { GET_POST } from "../gql/post";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import Comment from "../components/Comment";

export default function Details({ route, navigation }) {
  const [post, setPost] = useState(null)
  const { _id } = route.params
  const { data } = useQuery(GET_POST, {
    variables: {
      postId: _id
    }
  })
  
  useEffect(() => {
    if(data) {
      setPost(data.post)
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
        {post && (
         <>
          <Post item={post} navigation={navigation}/>
            <FlatList 
              data={post.comments}
              renderItem={({item}) => <Comment item={item}/>}
              keyExtractor={item => item.createdAt}
              contentContainerStyle={{
                gap: 15
              }}
              ListHeaderComponent={
                <>
                  <TouchableNativeFeedback onPress={() => {
                    navigation.navigate("Comment", {
                      _id
                    })
                  }}>
                    <Text style={{
                      backgroundColor: '#DDE7F1',
                      borderRadius: 5,
                      padding: 8,
                      margin: 8,
                      color: 'gray'
                    }}>Add your comment</Text>
                  </TouchableNativeFeedback>
                  <View 
                    style={{
                      borderBottomWidth: 0.5,
                      borderColor: 'gray'
                    }}
                  />
                </>
              }
            />
         </>
        )}
      </View>
    </SafeAreaView>
  )
}