import { Image, Text, TouchableNativeFeedback, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "../Styles";
import { FontAwesome } from '@expo/vector-icons';
import { totalDate } from "../helpers/converter";
import { FOLLOW } from "../gql/user";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_POST, GET_POSTS, LIKE_POST } from "../gql/post";

export default function Post({ item, navigation }) {
  const [followed, setFollowed] = useState(false)
  const [liked, setLiked] = useState(false)
  const [follow] = useMutation(FOLLOW)
  const [like] = useMutation(LIKE_POST, {
    refetchQueries: [
      GET_POSTS, GET_POST
    ]
  })

  return (
    <View style={{
      backgroundColor: 'white'
    }}>
      <View style={{
        padding: 12
      }}>
        <View style={{
          marginBottom: 5,
          flexDirection: "row",
          justifyContent: 'space-between'
        }}>
          <View style={{
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center'
          }}>
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
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
            <View>
              <Text style={{
                fontWeight: 'bold',
                fontSize: 16
              }}>{item.user.username}</Text>
              <Text style={{
                color: 'gray',
                fontSize: 12
              }}>{item.user.email}</Text>
              <Text style={{
                color: 'gray',
                fontSize: 12
              }}>{totalDate(item.createdAt)}</Text>
            </View>
          </View>
          <View>
            <TouchableWithoutFeedback onPress={async () => {
              try {
                await follow({
                  variables: {
                    userId: item.authorId
                  }
                })
                setFollowed(true)
              } catch (error) {
                setFollowed(true)
              }
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5
              }}>
                {!followed && <Text style={{
                  color: styles.primary.color,
                  fontSize: 20
                }}>+</Text>}
                <Text style={{
                  color: followed ? "gray" : styles.primary.color,
                  marginTop: 2
                }}>{followed ? "Followed" : "Follow"}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <Text>{item.content}</Text>
      </View>
      <Image source={{
        uri: item.imgUrl || 'https://media.licdn.com/media/AAYQAQQSAAgAAQAAAAAAABgBrZ2daanMQJ-egBdqUfzcNg.gif'
      }} style={{
        width: "100%",
        height: 300
      }}/>
      <View style={{
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <View style={{
          flexDirection: 'row'
        }}>
          <Image source={require('../assets/like.png')} style={{
              width: 22,
              aspectRatio: '1/1'
            }}
          />
          <Image source={require('../assets/celebrate.png')} style={{
              width: 22,
              aspectRatio: '1/1'
            }}
          />
          <Image source={require('../assets/insightful.png')} style={{
              width: 22,
              aspectRatio: '1/1',
              marginEnd: 8
            }}
          />
          <Text style={{
            color: 'gray'
          }}>{item.likes.length}</Text>
        </View>
        <Text style={{
          color: 'gray'
        }}>{item.comments.length} Comments</Text>
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 0.5,
        borderColor: 'gray'
      }}>
        <TouchableNativeFeedback onPress={async () => {
          try {
            await like({
              variables: {
                like: {
                  postId: item._id
                }
              }
            })
            setLiked(true)
          } catch (error) {
            console.log(error);
            setLiked(true)            
          }
        }}>
          <View style={{
            justifyContent: 'center',
            flex: 1,
            gap: 5,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <FontAwesome name="thumbs-o-up" size={22} color={liked ? styles.primary.color : "gray"} />
            <Text style={{
              color: liked ? styles.primary.color : "gray"
            }}>Like</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => {
          navigation.navigate("Details", { 
            _id: item._id
          })
        }}>
          <View style={{
            justifyContent: 'center',
            gap: 5,
            flex: 1,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <FontAwesome name="commenting-o" size={22} color="gray" />
            <Text style={{
              color: 'gray'
            }}>Comment</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => {
          console.log("Bagikan")
        }}>
          <View style={{
            justifyContent: 'center',
            flex: 1,
            gap: 5,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <FontAwesome name="share-square-o" size={22} color="gray" />
            <Text style={{
              color: 'gray'
            }}>Share</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
}