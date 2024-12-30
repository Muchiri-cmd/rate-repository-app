import {FlatList,View,StyleSheet} from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepos';
import { Pressable } from 'react-native';
import { useNavigate } from 'react-router';
import LoadingOrError from './LoadingOrError';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';


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
  const [selectedSort, setSelectedSort] = useState('latest');
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');

  const { repositories, error, loading } = useRepositories(orderBy, orderDirection);

  if (loading || error) {
    return <LoadingOrError loading={loading} error={error} />;
  }

  const handlePickerChange = (itemValue) => {
    setSelectedSort(itemValue);
    
    switch(itemValue) {
      case 'highest':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('DESC');
        break;
      case 'lowest':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('ASC');
        break;
      case 'latest':
        setOrderBy('CREATED_AT');
        setOrderDirection('DESC');
        break;
    }
  };

  return (
    <>
      <Picker
        selectedValue={selectedSort}
        onValueChange={handlePickerChange}
      >
        <Picker.Item label="Latest Repositories" value="latest" />
        <Picker.Item label="Highest Rated Repositories" value="highest" />
        <Picker.Item label="Lowest Rated Repositories" value="lowest" />
      </Picker>

      <RepositoryListContainer repositories={repositories} />
    </>
  );
};



export default RepositoryList;