import { View, StyleSheet } from 'react-native';
import AppBarTab from './AppBarTab';

import Constants from 'expo-constants';
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft:20,
    backgroundColor:theme.colors.appBarBg,
    paddingBottom:20,
  },
});

const AppBar = () => {
  return (
  <View style={styles.container}>
    <AppBarTab label="Repositories" /> 
  </View>
  )
};

export default AppBar;