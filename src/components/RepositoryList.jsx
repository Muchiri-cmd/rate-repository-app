import {FlatList,View,StyleSheet,Text} from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const styles = StyleSheet.create({
  separator:{
    height:2,
  }
});

const ItemSeperator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { data,error,loading} = useQuery(GET_REPOSITORIES)

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error fetching repos</Text>

  //Get nodes from edges array
  const repositoryNodes = data.repositories.edges
    ? data.repositories.edges.map(edge => edge.node)
    : []  

  return (
    <FlatList
      data = {repositoryNodes}
      ItemSeparatorComponent={ItemSeperator}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => <RepositoryItem {...item}/>}
    />
  );
};



export default RepositoryList;