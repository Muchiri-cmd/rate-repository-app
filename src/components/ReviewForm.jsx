import { View ,TextInput ,Text,StyleSheet,Button} from "react-native"
import * as yup from 'yup';
import { useFormik } from 'formik';
import theme from "./theme";
import usecreateReview from "../hooks/useCreateReview";
const initialValues = {
  owner_name:'',
  repo_name:'',
  rating:0,
  review:''
}

const validationSchema = yup.object().shape({
  owner_name:yup.string().required('Username is required'),
  repo_name:yup.string().required('Repository Name is required'),
  rating:yup.number().required().max(100,'Rating cant exceed 100')
    .min(0,'Rating Cant be less than 0').positive().integer(),
  review:yup.string().optional()
})

const ReviewForm = () => {
  const { handleSubmit,data,loading,error } = usecreateReview();
  // console.log("data",data);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit:handleSubmit
  })

  const { errors, touched } = formik;

  return (
    <View style={styles.form}>
      <TextInput
        style={errors.owner_name && touched.owner_name ? styles.ErrorInput: styles.input}
        placeholder="Repository Owner Name"
        value={formik.values.owner_name}
        onChangeText={formik.handleChange('owner_name')}
        required
      />
      {formik.touched.owner_name && formik.errors.owner_name && (
        <Text style={styles.ErrorText}>{formik.errors.owner_name}</Text>
      )}
      <TextInput
        style={errors.repo_name && touched.repo_name ? styles.ErrorInput: styles.input}
        placeholder="Repository Name"
        value={formik.values.repo_name}
        onChangeText={formik.handleChange('repo_name')}
        required
      />
      {formik.touched.repo_name && formik.errors.repo_name && (
        <Text  style={styles.ErrorText}>{formik.errors.repo_name}</Text>
      )}
      <TextInput
        style={errors.rating && touched.rating ? styles.ErrorInput: styles.input}
        keyboardType="numeric"
        placeholder="Rating (0-100)"
        value={formik.values.rating.toString()}
        onChangeText={formik.handleChange('rating')}
        min = '0'
        max = '100'
        required
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text  style={styles.ErrorText}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={errors.review && touched.review ? styles.ErrorInput: styles.input}
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
        required
      />
      {formik.touched.review && formik.errors.review && (
        <Text  style={styles.ErrorText}>{formik.errors.review}</Text>
      )}  

      <Button 
        onPress={formik.handleSubmit}
        title="Create Review"
      />    

      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.ErrorText}>Error: {error.message}</Text>}

    </View>
  )
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
export default ReviewForm
