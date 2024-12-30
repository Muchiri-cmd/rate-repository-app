import { View,Text,StyleSheet } from "react-native"
import theme from "./theme";

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

export default ReviewItem