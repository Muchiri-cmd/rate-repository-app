import { Button,TextInput,View,StyleSheet} from 'react-native';
import { useFormik } from 'formik';
import theme from './theme';

const initialValues = {
  username : '',
  password : '',
}

const LoginForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit
  });

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value = {formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <TextInput 
        style={styles.input}
        placeholder = "Password"
        secureTextEntry = {true}
        value = { formik.values.password}
        onChangeText = { formik.handleChange('password')}
      />
      <Button 
        onPress={formik.handleSubmit}
        title="Sign in"
      />
      
    </View>
  )
}


const SignIn = () => {
  const onSubmit = values => {
    const username = values.username
    const password = values.password

    if (password && username ){
      console.log(`password: ${password} \n username:${username}`)
    } else {
      console.log(`Kindly enter correct login credentials`)
    }
  }
  
  return <LoginForm onSubmit={onSubmit} />
};

const styles = StyleSheet.create({
  form : {
    backgroundColor:theme.colors.white,
    padding:15,
    display:'flex',
  },
  input:{
    height:40,
    margin:12,
    borderColor: 'gray',
    borderRadius:8,
    borderWidth:1,
    padding:10,
  }
 
})
export default SignIn;