import { StyleSheet,View } from 'react-native';
import AppBar from './AppBar';
import theme from './theme';
import RepositoryList from './RepositoryList';
import Repository from './Repository';
import { Route,Routes,Navigate } from 'react-router-native';
import SignIn from './SignIn';
import ReviewForm from './ReviewForm';

const styles = StyleSheet.create({
  container:{
    flexGrow:1,
    flexShrink:1,  
    backgroundColor:theme.colors.MainBg,
    fontFamily:theme.fonts.main,
  },
});

const Main = () => {
  return (
    <View style = {styles.container}>
      <AppBar/>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/repo/:id" element={<Repository  />} />
        <Route path="/review" element={<ReviewForm />}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

export default Main;