import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNavigation from './HomeNavigation';
import Welcome from '../pages/Welcome';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Post from '../pages/Post';
import { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import Profile from '../pages/Profile';
import Details from '../pages/Details';
import Comment from '../pages/Comment';
import Search from '../pages/Search';

const Stack = createNativeStackNavigator()

export default function AppNavigation() {
  const { login } = useContext(LoginContext)

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      {login ? 
        <>
          <Stack.Screen name="Home" component={HomeNavigation} />
          <Stack.Screen name="Post" component={Post} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Comment" component={Comment} />
          <Stack.Screen name="Search" component={Search} />
        </>
        :
        <>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      }
    </Stack.Navigator>
  )
}