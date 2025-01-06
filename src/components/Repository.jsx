import RepositoryItem from "./RepositoryItem";
import Reviews from "./Reviews";
import { View } from "react-native";
import * as Linking from 'expo-linking';
import { useParams } from "react-router-native";


import useRepo from "../hooks/useRepo";
import LoadingOrError from "./LoadingOrError";


const Repository = () => {
  const { id: repoId } = useParams();
  const first = 3;

  // console.log("repoId:",repoId)

  const { data, loading, error,fetchMoreReviews } = useRepo(repoId,first);
  
  // console.log("Data",data?.repository?.reviews?.edges)

  if (loading || error){
    <LoadingOrError loading={loading} error={error}/>
  }

  const openInGithub = () => {
    Linking.openURL(data?.repository?.url)
  }
  
  return (
    <View style={{ flex:1 }}>
      <RepositoryItem {...data?.repository} openInGithub={openInGithub} />
      <Reviews reviews={data?.repository?.reviews?.edges} fetchMoreReviews={fetchMoreReviews}/>
    </View>
  )
}




export default Repository
