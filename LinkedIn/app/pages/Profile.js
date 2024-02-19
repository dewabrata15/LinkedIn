import { FlatList, Image, Text, TouchableNativeFeedback, View } from "react-native";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import { USER } from "../gql/user";
import { useQuery } from "@apollo/client";
import { styles } from "../Styles";
import Network from "../components/Network";

export default function Profile({ navigation, route }) {
  const [following, setFollowing] = useState([])
  const [follower, setFollower] = useState([])
  const { deleteToken } = useContext(LoginContext)
  const { myself, _id } = route.params
  const { data } = useQuery(USER, {
    variables: {
      userId: _id,
      myself
    },
    fetchPolicy: 'no-cache'
  })

  useEffect(() => {
    if(data) {
      setFollowing(data.user.following)
      setFollower(data.user.follower)
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
          padding: 25,
          alignItems: 'center'
        }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            overflow: 'hidden'
          }}>
            <Image 
              source={{
                uri: 'https://media.licdn.com/dms/image/D5635AQGXW0U7XhrOLA/profile-framedphoto-shrink_400_400/0/1660002772504?e=1707591600&v=beta&t=RzeLmFDFEqHhNx7ArlDXuGp7bS7Y0YeSCBnpSVnxIm4'
              }}
              style={{
                width: '100%',
                aspectRatio: '1/1'
              }}
            />
          </View>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 16
          }}>{data?.user.username}</Text>
          <Text style={{
            color: 'gray',
            fontSize: 12
          }}>{data?.user.email}</Text>
          <View style={{
            flexDirection: 'row',
            gap: 20
          }}>
            <Text style={{
              color: styles.primary.color
            }}>{data?.user?.follower.length} Followers</Text>
            <Text style={{
              color: styles.primary.color
            }}>{data?.user?.following.length} Followings</Text>
          </View>
          {myself && <TouchableNativeFeedback onPress={async () => {
            await deleteToken()
          }}>
            <Text style={{
              color: styles.err.color,
              marginTop: 20
            }}>Logout</Text>
          </TouchableNativeFeedback>}
        </View>
        <View style={{
          flex: 1
        }}>
          <View style={{
            flex: 1,
            backgroundColor: '#F4F2EE',
            paddingTop: 8
          }}>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 16,
              marginHorizontal: 8,
              padding: 8,
              backgroundColor: 'white'
            }}>Follower</Text>
            <FlatList
              data={follower}
              renderItem={({item}) => <Network item={item} tab={true} navigation={navigation}/>}
              keyExtractor={item => item._id}
              contentContainerStyle={{
                gap: 10,
                marginHorizontal: 8
              }}
            />
          </View>
          <View style={{
            flex: 1,
            backgroundColor: '#F4F2EE'
          }}>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 16,
              marginHorizontal: 8,
              padding: 8,
              backgroundColor: 'white'
            }}>Following</Text>
            <FlatList
              data={following}
              renderItem={({item}) => <Network item={item} tab={true} navigation={navigation}/>}
              keyExtractor={item => item._id}
              contentContainerStyle={{
                gap: 10,
                marginHorizontal: 8
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}