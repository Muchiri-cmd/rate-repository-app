import { View, StyleSheet } from 'react-native';
import AppBarTab from './AppBarTab';

import Constants from 'expo-constants';
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal:20,
    backgroundColor:theme.colors.appBarBg,
    paddingBottom:10,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
});

const AppBar = () => {
  return (
  <View style={styles.container}>
      <AppBarTab label="Repositories" to="/"/> 
      <AppBarTab label="Sign in" to="/sign-in"/>
  </View>
  )
};

export default AppBar;