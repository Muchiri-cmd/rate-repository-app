import { useQuery } from "@apollo/client"
import { SEARCH_REPOSITORY } from "../graphql/queries"

const useSearch = (searchQuery) => {
  const { data, error ,loading } = useQuery(SEARCH_REPOSITORY,{
    fetchPolicy:"cache-and-network",
    variables:{ searchKeyword: searchQuery }
  })
  const repositories = data?.repositories || null;

  return { repositories, error, loading}
}

export default useSearch
