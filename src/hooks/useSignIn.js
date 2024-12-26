import { useMutation } from "@apollo/client"
import { AUTHENTICATE_LOGIN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";
import { useNavigate } from 'react-router';
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  let navigate = useNavigate();
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(AUTHENTICATE_LOGIN)

  const signIn = async ({ username, password }) => {
    try {

      const { data } = await mutate ({
        variables: { credentials: { username,password }}
      })

      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore()

      const token = await authStorage.getAccessToken();
      // console.log(token);

      //redirect on successful login 
      if (token){
        navigate('/')
      }
      
      return data.authenticate.accessToken
    
    } catch(error){
      //Hanldes errors
      console.error(" Error during sign-in", error);
      throw error
    }

  };

  return [signIn,result];
}

export default useSignIn;