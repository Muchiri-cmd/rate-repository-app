import { View,Text,StyleSheet,Button,Alert } from "react-native"
import theme from "./theme";
import { useNavigate } from 'react-router';
import useDeleteReview from "../hooks/useDeleteReview";

const ReviewItem = ({ review,reviewActions,refetch }) => {
  const navigate = useNavigate();
  const { deleteReviewById } = useDeleteReview()

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
      {reviewActions && (
        <View style={styles.buttons}>

          <Button title="View Repository"
            onPress={() => { 
              navigate(`/repo/${review.repositoryId}`)
            }}
          />

          <Button title="Delete Review" 
            color="#dc3545"
            onPress={() => {
              Alert.alert(
                'Confirm Deletion',
                'Are you sure you want to delete this review?',
                [{ text: 'Cancel'},
                  {text: 'Delete',
                    onPress: async() => {
                      await deleteReviewById(review.id);
                      refetch();
                    },
                  },
                ],
                { cancelable: true } //cancels when sb clicks outside
              );
            }}
          />
        </View>
      )}
      
    </View>
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
  },
  buttons:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:10,
    margin:8,
  }
})

export default ReviewItem