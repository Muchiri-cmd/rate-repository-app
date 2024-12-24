import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants'

const apolloUrl = Constants.expoConfig?.extra?.apollo_url;
// console.log(Constants.expoConfig.extra)
// console.log(apolloUrl)

const createApolloClient = () => {
  
  return new ApolloClient({
    uri:apolloUrl,
    cache:new InMemoryCache(),
  });
}

export default createApolloClient;