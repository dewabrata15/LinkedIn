import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome6, FontAwesome } from '@expo/vector-icons';
import Home from '../pages/Home';
import Networks from '../pages/Networks';
import Notifications from '../pages/Notifications';
import Jobs from '../pages/Jobs';
import Post from '../pages/Post';
import Navbar from '../components/Navbar';

const Tab = createBottomTabNavigator();

export default function HomeNavigation({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name='House' component={Home} options={{
        tabBarIcon: ({ focused }) => {
          if(focused) {
            return <FontAwesome6 name="house" size={22} color="black" />
          }
          return <FontAwesome6 name="house" size={18} color="gray" />
        },
        tabBarLabelStyle: {
          color: "gray"
        },
        headerShown: false,
        tabBarLabel: "Home"
      }}/>
      <Tab.Screen name="My Network" component={Networks} options={{
        tabBarIcon: ({ focused }) => {
          if(focused) {
            return <FontAwesome6 name="user-group" size={22} color="black" />
          }
          return <FontAwesome6 name="user-group" size={18} color="gray" />
        },
        tabBarLabelStyle: {
          color: "gray"
        },
        headerShown: false
      }}/>
      <Tab.Screen name="Post" component={Post} options={{
        tabBarIcon: () => {
          return <FontAwesome name="plus-square" size={22} color="gray" />
        }
      }} listeners={() => ({
        tabPress: event => {
          event.preventDefault()
          navigation.navigate("Post")
        }
      })}/>
      <Tab.Screen name="Notifications" component={Notifications} options={{
        tabBarIcon: ({ focused }) => {
          if(focused) {
            return <FontAwesome name="bell" size={22} color="black" />
          }
          return <FontAwesome name="bell" size={18} color="gray" />
        },
        tabBarLabelStyle: {
          color: "gray"
        },
        headerShown: false
      }}/>
      <Tab.Screen name="Jobs" component={Jobs} options={{
        tabBarIcon: ({ focused }) => {
          if(focused) {
            return <FontAwesome6 name="briefcase" size={22} color="black" />
          }
          return <FontAwesome6 name="briefcase" size={18} color="gray" />
        },
        tabBarLabelStyle: {
          color: "gray"
        },
        headerShown: false
      }}/>
    </Tab.Navigator>
  )
}