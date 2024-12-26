import { Button,TextInput,View,StyleSheet,Text} from 'react-native';
import { useFormik } from 'formik';
import theme from './theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
// import AuthStorage from '../utils/authStorage';



const validationSchema = yup.object().shape({
  username:yup.string()
    .required('Username is required')
    .min(3,'Username must be atleast 3 characters')
    .matches(/^[a-zA-Z0-9_]+$/,"Username can only contain letters,numbers and underscores"),
  password: yup.string()
    .required('Password is required')
    .min(8,"Paswsord must be atleast 8 characters")
});

const initialValues = {
  username : '',
  password : '',
}

const LoginForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  const { errors, touched } = formik;

  return (
    <View style={styles.form}>
      <TextInput
        style={errors.username && touched.username ? styles.ErrorInput: styles.input}
        placeholder="Username"
        value = {formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.ErrorText}>{formik.errors.username}</Text>
      )}
      <TextInput 
        style={errors.password && touched.password ? styles.ErrorInput: styles.input}
        placeholder = "Password"
        secureTextEntry = {true}
        value = { formik.values.password}
        onChangeText = { formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.ErrorText}>{formik.errors.password}</Text>
      )}
      <Button 
        onPress={formik.handleSubmit}
        title="Sign in"
      />
      
    </View>
  )
}


const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username,password } = values

    try{
      await signIn ({ username,password });
    } catch( error ){
      console.log(error)
    }

    // if (password && username ){
    //   console.log(`password: ${password} \n username:${username}`)
    // } else {
    //   console.log(`Kindly enter correct login credentials`)
    // }
  }
  
  return <LoginForm onSubmit={onSubmit} />
};

const styles = StyleSheet.create({
  form : {
    backgroundColor:theme.colors.white,
    padding:10,
    display:'flex',
  },
  input:{
    height:40,
    margin:8,
    borderColor: 'gray',
    borderRadius:8,
    borderWidth:1,
    padding:10,
  },
  ErrorText:{
    color:theme.colors.error,
    marginLeft:13,
  },
  ErrorInput:{
    height:40,
    margin:8,
    borderRadius:8,
    borderWidth:1,
    padding:10,
    borderColor: theme.colors.error,
  }
 
})
export default SignIn;