import { Text,View,StyleSheet } from 'react-native';

const RepositoryItem = (props) => {
  return (
    <View style={styles.container}>
      <Text>Full name: {props.fullName}</Text>
      <Text>Description:{props.description}</Text>
      <Text>Language:{props.language}</Text>
      <Text>Stars:{props.stargazersCount}</Text>
      <Text>Forks:{props.forksCount}</Text>
      <Text>Reviews:{props.reviewCount}</Text>
      <Text>Rating:{props.ratingAverage}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 2,
  },
});
export default RepositoryItem;