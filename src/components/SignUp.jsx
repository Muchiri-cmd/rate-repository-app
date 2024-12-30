import React from 'react'
import { View,Text,TextInput,StyleSheet,Button } from 'react-native'
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from './theme';
import useSignUp from '../hooks/useSignup';
import LoadingOrError from './LoadingOrError';

const validationSchema = yup.object().shape({
  username:yup.string().required('Username required')
    .min(5,'Length must be between 5 and 30')
    .max(30,'Length must be between 5 and 30')
    .matches(/^[a-zA-Z0-9_]+$/,"Username can only contain letters,numbers and underscores"),
  password:yup.string().required('Password required')
  .min(5,'Length must be between 5 and 30')
  .max(30,'Length must be between 5 and 30'),
  confirmPassword:yup.string().required()
    .oneOf([yup.ref('password')], 'Passwords must match')
})

const initialValues = {
  username:'',
  password:'',
  confirmPassword:''
}

const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  const { errors,touched } = formik;

  return (
    <View style={styles.form}>
      <TextInput 
        style={errors.username && touched.username ? styles.ErrorInput : styles.input}
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.ErrorText}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={errors.password && touched.password ?  styles.ErrorInput : styles.input}
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry= {true}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.ErrorText}>{formik.errors.password}</Text>
      )}

      <TextInput 
        style={errors.confirmPassword && touched.confirmPassword ? styles.ErrorInput : styles.input}
        placeholder='Confirm password'
        secureTextEntry = { true }
        value= {formik.values.confirmPassword}
        onChangeText = {formik.handleChange('confirmPassword')}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <Text style={styles.ErrorText}>{formik.errors.confirmPassword}</Text>
      )}

      <Button
        onPress={formik.handleSubmit}
        title="Sign Up"
      />
    </View>
  )
 
}

const SignUp = () => {
  const [signUp, {error}] = useSignUp();

  const onSubmit = async(values) => {
    const { username,password } = values;
  
    try {
      await signUp({ username,password })
      // console.log('Signup successful');
      
    } catch(error){
      console.log("Error signing up:",error)
    }
  }

   if (error){
    <LoadingOrError error={error}/>
   }
  return <SignUpForm onSubmit={onSubmit}/>
}

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

export default SignUp
