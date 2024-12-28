import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import { View,Text, FlatList, StyleSheet} from "react-native";
import * as Linking from 'expo-linking';
import { useParams } from "react-router-native";
import theme from "./theme";


const Repository = () => {
  const { id: repoId } = useParams();
  // console.log("repoId:",repoId)

  const { data,loading,error } = useQuery(GET_REPOSITORY,{
    variables:{ id: repoId },
    fetchPolicy: "network-only"
  })
  
  // console.log("Data",data?.repository?.reviews?.edges)

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const openInGithub = () => {
    Linking.openURL(data?.repository?.url)
  }
  
  return (
    <View style={{ flex:1 }}>
      <RepositoryItem {...data.repository} openInGithub={openInGithub} />
      <Reviews reviews={data.repository.reviews.edges}/>
    </View>
  )
}

const ReviewItem = ({ review }) => {
  return(
    <View style={styles.container}>
      <View style={styles.review_info}>
          <Text style={styles.rating}>{review.rating}</Text>
          <View> 
              <Text style={styles.username}>{review.user.username}</Text>
              <Text style={styles.date}>{new Date(review.createdAt).toLocaleDateString()}</Text>
              <Text style={styles.text}>{review.text}</Text>
          </View>
        
      </View>
    
    </View>
  )
  
}

const Reviews = ({ reviews }) => {
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={({ node }) => node.id}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    elevation: 2,
  },
  review_info:{
    flexDirection:'row',
    gap:12,
    marginRight:45,
  },
  rating:{
    borderWidth:2,
    borderRadius:100,
    borderColor:'blue',
    padding:10,
    height:40,
  },
  username:{
    fontWeight:'bold',
  },
  date:{
    color:theme.colors.textSecondary,
  },
  text:{
    flexWrap:'wrap'
  }
})
export default Repository
