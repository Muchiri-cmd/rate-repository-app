import { useQuery } from "@apollo/client"
import { GET_CURRENT_USER } from "../graphql/queries"

const useReviews = () => {
  const { data, error , loading } = useQuery(GET_CURRENT_USER,{
    fetchPolicy:'cache-and-network',
    variables: { includeReviews: true}
  })

  return { data,error,loading}
  
}

export default useReviews
