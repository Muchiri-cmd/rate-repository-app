import React from 'react'
import { FlatList } from 'react-native'
import ReviewItem from './ReviewItem'
import useReviews from '../hooks/useReviews'
import LoadingOrError from './LoadingOrError'


const Reviews = ({ reviews, fetchMoreReviews, reviewActions = false }) => {
  const {data, error, loading ,refetch } = useReviews();

  if ( error || loading ){
    return <LoadingOrError loading={loading} error={error} />
    
  }

  const userReviews = data?.me?.reviews?.edges
  reviews = reviews ? reviews : userReviews

  const onEndReach = () => {
    // console.log('You have reached the end of reviews');
    fetchMoreReviews()
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item.node} reviewActions={reviewActions} refetch={refetch}/>}
      keyExtractor={({ node }) => node.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )
}

export default Reviews
