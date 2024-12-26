import useAuthStorage from "./useAuthStorage"
import { useApolloClient } from "@apollo/client";


const useSignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    try {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
      // console.log('successfully signed out')
    
    } catch (error){
      console.error('Error signing out')
    }
  
  }

  return signOut
}

export default useSignOut