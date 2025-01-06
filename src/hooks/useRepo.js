import { GET_REPOSITORY } from "../graphql/queries"
import { useQuery } from "@apollo/client"

const useRepo = (repoId,first) => {
  const initialVariables ={
    id: repoId,
    first:first,
  }

  const { data,loading,error,fetchMore,...result } = useQuery(GET_REPOSITORY,{
    variables:initialVariables,
    fetchPolicy: 'cache-and-network',
  })

  // console.log("has next page:",data?.repository?.reviews?.pageInfo?.hasNextPage)
  
  const handleFetchMoreReviews = () => {
    // console.log('fetching more reviews..')
    const canFetchMore = !loading && data?.repository?.reviews?.pageInfo?.hasNextPage

    if (!canFetchMore){
      return;
    }
     fetchMore({
      variables:{
        ...initialVariables,
        after:data?.repository?.reviews?.pageInfo?.endCursor,
      }
     })
  }


  return { data,error,loading,fetchMoreReviews:handleFetchMoreReviews, ...result}
}

export default useRepo
