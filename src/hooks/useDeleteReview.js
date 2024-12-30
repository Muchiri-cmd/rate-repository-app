import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
  const [deleteReview, { loading, error }] = useMutation(DELETE_REVIEW);

  const deleteReviewById = async (id) => {
    try {
      await deleteReview({ variables: { deleteReviewId: id } });
      console.log('successfully deleted ${id}')
    } catch (error) {
      console.log('Error deleting review:', error);
    }
  };

  return { deleteReviewById, loading, error };
};

export default useDeleteReview;
