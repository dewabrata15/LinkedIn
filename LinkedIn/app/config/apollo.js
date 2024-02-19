import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import * as SecureStore from 'expo-secure-store';

const httpLink = createHttpLink({
  uri: "http://54.179.24.210/",
})

const authLink = setContext(async () => {
  const token = await SecureStore.getItemAsync("access_token")

  return {
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client