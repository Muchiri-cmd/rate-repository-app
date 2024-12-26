import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants'
import { setContext } from '@apollo/client/link/context';


const apolloUrl = Constants.expoConfig?.extra?.apollo_url;
// console.log(Constants.expoConfig.extra)
// console.log(apolloUrl)

const httpLink = createHttpLink({
  uri:apolloUrl,
})

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_,{ headers }) => {
    try{
      const accessToken = await authStorage.getAccessToken();
      return {
        headers:{
          ...headers,
          authorization:accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (error) {
      console.log(error);
      return {
        headers,
      };
    }
  });
  
  return new ApolloClient({
    link:authLink.concat(httpLink),
    cache:new InMemoryCache(),
  });
}

export default createApolloClient;