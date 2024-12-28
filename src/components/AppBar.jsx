import { View, StyleSheet } from 'react-native';
import AppBarTab from './AppBarTab';

import Constants from 'expo-constants';
import theme from './theme';
import { ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal:20,
    backgroundColor:theme.colors.appBarBg,
    paddingBottom:10,
    display:'flex',
  },
  scrollViewContent: {
    justifyContent: 'space-between', 
    flexGrow: 1, 
  }

});

const AppBar = () => {
  const { data } = useQuery(GET_CURRENT_USER)
  // console.log(data);
  const currentUser = data?.me?.username;
  // console.log(currentUser)

  const signOut = useSignOut();

  const handleSignOut = async () => {
    await signOut();
    // console.log('Signed out successfully');
    
  }

  return (
  <View style={styles.container}>
    <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        horizontal 
        showsHorizontalScrollIndicator={false}
      >
        <AppBarTab label="Repositories" to="/" />
        <AppBarTab label="Create Review" to="/review" />

        { currentUser ? 
          <AppBarTab label="Sign Out" to="/sign-in" onPress={handleSignOut}/>
           :
          <AppBarTab label="Sign in" to="/sign-in" />
        }
         
      </ScrollView>
  </View>
  )
};

export default AppBar;