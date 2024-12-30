import {  Pressable } from 'react-native';
import Text from './Text'
import { StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  textStyle:{
    marginTop:15,
    fontSize:13
  }
})
const AppBarTab = ({ label,to, onPress}) => {

  return (
    <Link to={to} component={Pressable} onPress={onPress}>
        <Text color="white" fontWeight="bold" style={styles.textStyle}>
          {label}
        </Text>
    </Link>
  );
};

export default AppBarTab;