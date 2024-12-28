import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import { Button,View,Text} from "react-native";
import * as Linking from 'expo-linking';
import { useParams } from "react-router-native";

const Repository = () => {
  const { id: repoId } = useParams();
  // console.log("repoId:",repoId)

  const { data,loading,error } = useQuery(GET_REPOSITORY,{
    variables:{ id: repoId },
    fetchPolicy: "network-only"
  })
  
  // console.log("Data",data?.repository)

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const openInGithub = () => {
    Linking.openURL(data?.repository?.url)
  }
  
  return (
    <View>
      <RepositoryItem {...data.repository} />
      <Button title="Open in Github" onPress={openInGithub} />
    </View>
  )
}

export default Repository
