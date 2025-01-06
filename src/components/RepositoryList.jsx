import {FlatList,View,StyleSheet} from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepos';
import { Pressable } from 'react-native';
import { useNavigate } from 'react-router';
import LoadingOrError from './LoadingOrError';
import { useState } from 'react';
import OrderSelector from './OrderSelector';
import SearchBar from './SearchBar';
import useSearch from '../hooks/useSearch';
import { useDebounce } from 'use-debounce'


const styles = StyleSheet.create({
  separator:{
    height:2,
  }
});

const ItemSeperator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories,onEndReach }) => {
    const navigate = useNavigate();
    //Get nodes from edges array
    const repositoryNodes = repositories?.edges
    ? repositories?.edges.map(edge => edge.node)
    : []  

    return (
      <FlatList
        data = {repositoryNodes}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
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
  const first = 3;

  const [ searchQuery,setSearchQuery ] = useState('')
  const [ debouncedQuery ] = useDebounce(searchQuery)

  const { repositories:sortedRepos,error:sortedReposError,
     loading:sortedReposLoading,fetchMore } = useRepositories(orderBy, orderDirection , first);



  const { repositories:filteredRepos } = useSearch(debouncedQuery)

  if (sortedReposError || sortedReposLoading) {
    return <LoadingOrError loading={sortedReposLoading} error={sortedReposError} />;
  }

  const repositories = searchQuery ? filteredRepos : sortedRepos

  const onEndReach = () => {
    if (!searchQuery) {
      // console.log('You have reached the end of repositories');
      fetchMore();
    }
  }

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    
      <OrderSelector
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        setOrderBy={setOrderBy}
        setOrderDirection={setOrderDirection}
      />
      <RepositoryListContainer repositories={repositories} onEndReach={onEndReach} />
    </>
  );
};



export default RepositoryList;