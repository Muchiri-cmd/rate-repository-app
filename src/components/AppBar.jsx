import { View, StyleSheet } from 'react-native';
import AppBarTab from './AppBarTab';

import Constants from 'expo-constants';
import theme from './theme';
import { ScrollView } from 'react-native';

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
  return (
  <View style={styles.container}>
    <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        horizontal 
        showsHorizontalScrollIndicator={false}
      >
        <AppBarTab label="Repositories" to="/" />
        <AppBarTab label="Sign in" to="/sign-in" />
      </ScrollView>
  </View>
  )
};

export default AppBar;