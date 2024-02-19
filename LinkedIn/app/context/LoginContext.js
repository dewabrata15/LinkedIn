import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const LoginContext = createContext()

export function LoginProvider({ children }) {
  const [login, setLogin] = useState(null)

  useEffect(() => {
    getToken()
  }, [])

  async function getToken() {
    try {
      const token = await SecureStore.getItemAsync("access_token")
      if(token) setLogin(token)
    } catch (error) {
      console.log(error)
    }
  }

  async function setToken(token) {
    try {
      await SecureStore.setItemAsync("access_token", token)
      setLogin(token)
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteToken() {
    try {
      await SecureStore.deleteItemAsync("access_token")
      setLogin(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <LoginContext.Provider value={{ login, setToken, deleteToken }}>
      {children}
    </LoginContext.Provider>
  )
}