import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./navigations/AppNavigation";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import { LoginProvider } from "./context/LoginContext";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <LoginProvider>
          <AppNavigation />
        </LoginProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
}