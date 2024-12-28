import { GET_REPOSITORY } from "../graphql/queries"
import { useQuery } from "@apollo/client"

const useRepo = (repoId) => {
  
  const { data,loading,error } = useQuery(GET_REPOSITORY,{
    variables:{ id: repoId },
    fetchPolicy: 'cache-and-network',
  })

  return { data,error,loading}
}

export default useRepo
