import { useMutation } from "@apollo/client"
import { REGISTER_USER } from "../graphql/mutations"
import { useNavigate } from 'react-router';

const useSignUp = () => {
  
  const [ registerUser , { data,error,loading }] = useMutation(REGISTER_USER)
  const navigate = useNavigate();
  
  const signUp =  async({ username,password }) => {
    try {
      const response = await registerUser({
        variables: { user : { username,password }}
      })

      // console.log("reponse:",response?.data?.createUser)
      if (response?.data?.createUser){
        navigate('/sign-in')
      }

    } catch (error){
      console.error(" Error during sign-up:", error);
    }

  }
  return [signUp,{ data,error,loading}]
}

export default useSignUp