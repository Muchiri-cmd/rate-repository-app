import { useQuery } from '@apollo/client';
// import { GET_REPOSITORIES } from '../graphql/queries';
import { GET_ORDERED_REPOSITORIES } from '../graphql/queries';

const useRepositories = ( orderBy,orderDirection,first ) => {
  const initialVariables = {
    orderBy,
    orderDirection,
    first,
  };

  const { data,error,loading,fetchMore,...result } = useQuery(GET_ORDERED_REPOSITORIES,{
    variables:initialVariables,
    fetchPolicy:'network-only',
    nextFetchPolicy: 'cache-first', 
  })

  const handleFetchMore = () => {
    // console.log('Fetching More Repositories')
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if(!canFetchMore){
      return
    }

    fetchMore({
      variables:{
        ...initialVariables,
        after:data?.repositories?.pageInfo?.endCursor,
      }
    })
  } 
  
  return {
    repositories:data?.repositories,
    error,
    loading,
    fetchMore:handleFetchMore,
    ...result
  };
  

}

export default useRepositories;