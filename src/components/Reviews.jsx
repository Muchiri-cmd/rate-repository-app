import React from 'react'
import { FlatList } from 'react-native'
import ReviewItem from './ReviewItem'
import useReviews from '../hooks/useReviews'
import LoadingOrError from './LoadingOrError'


const Reviews = ({ reviews }) => {
  const {data, error, loading} = useReviews();

  if ( error || loading ){
    return(
      <LoadingOrError error={error} loading={loading}/>
    )
  }

  const userReviews = data?.me?.reviews?.edges
  reviews = reviews ? reviews : userReviews

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={({ node }) => node.id}
    />
  )
}

export default Reviews
