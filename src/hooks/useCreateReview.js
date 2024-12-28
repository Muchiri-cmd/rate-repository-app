import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useNavigate } from 'react-router';

const usecreateReview = () => {
  const [createReview,{data,loading,error}] = useMutation(CREATE_REVIEW);

  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const { owner_name,repo_name,rating,review} = values;

    try {
      const { data } = await createReview({
        variables:{
          review:{
            repositoryName:repo_name,
            ownerName:owner_name,
            rating:parseInt(rating,10),
            text:review,
          }
        }
      })
      // console.log("Review created successfully:", data);
    }catch(error){
      console.error("Error creating review:",error);
    }
  }

  if (data){
    navigate(`/repo/${data.createReview.repository.id}`)
  }
  return {handleSubmit,data,loading,error}
}

export default usecreateReview