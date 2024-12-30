import {FlatList,View,StyleSheet} from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepos';
import { Pressable } from 'react-native';
import { useNavigate } from 'react-router';
import LoadingOrError from './LoadingOrError';

const styles = StyleSheet.create({
  separator:{
    height:2,
  }
});

const ItemSeperator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {

    const navigate = useNavigate();
    //Get nodes from edges array
    const repositoryNodes = repositories?.edges
    ? repositories?.edges.map(edge => edge.node)
    : []  


    return (
      <FlatList
        data = {repositoryNodes}
        ItemSeparatorComponent={ItemSeperator}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => 
        <Pressable
          onPress={() => navigate(`/repo/${item.id}`)}
         >
               <RepositoryItem {...item}/>
        </Pressable>
      }
      />
    );
}

const RepositoryList = () => {
  const { repositories,error,loading } = useRepositories();

  if (loading || error) {
    return <LoadingOrError loading={loading} error={error} />;
  }
  return <RepositoryListContainer repositories={repositories}/>
};



export default RepositoryList;