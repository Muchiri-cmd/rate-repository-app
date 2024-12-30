import { Searchbar } from 'react-native-paper'
import { StyleSheet } from 'react-native';
import theme from './theme';

const SearchBar = ({searchQuery, setSearchQuery}) => {
  return (
    <Searchbar
      style={styles.searchbar}
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  )
}

const styles = StyleSheet.create({
  searchbar:{
    backgroundColor : theme.colors.white,
    borderRadius:10,
    margin:8
  }
})

export default SearchBar
