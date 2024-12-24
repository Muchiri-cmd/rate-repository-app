import { useMutation } from "@apollo/client"
import { AUTHENTICATE_LOGIN } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE_LOGIN)

  const signIn = async ({ username, password }) => {
    try {

      const { data } = await mutate ({
        variables: { credentials: { username,password }}
      })

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