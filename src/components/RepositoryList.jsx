import {FlatList,View,StyleSheet} from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepos';
import { Text } from 'react-native';

const styles = StyleSheet.create({
  separator:{
    height:2,
  }
});

const ItemSeperator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {

    //Get nodes from edges array
    const repositoryNodes = repositories?.edges
    ? repositories?.edges.map(edge => edge.node)
    : []  

    return (
      <FlatList
        data = {repositoryNodes}
        ItemSeparatorComponent={ItemSeperator}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <RepositoryItem {...item}/>}
      />
    );
}

const RepositoryList = () => {
  const { repositories,error,loading } = useRepositories();

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error fetching repos</Text>
 
  return <RepositoryListContainer repositories={repositories}/>
};

export default RepositoryList;