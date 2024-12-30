//mutations
import { gql } from '@apollo/client';

export const AUTHENTICATE_LOGIN = gql `
  mutation Authenticate($credentials:AuthenticateInput!){
    authenticate(credentials:$credentials){
      accessToken
    }
  }
`

export const REGISTER_USER = gql `
  mutation createUser($user:CreateUserInput!){
    createUser( user: $user){
      id 
      username
    }
  }
  
`
export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      repository {
        id
        fullName
        reviews {
          edges {
            node {
              id
              text
              rating
              createdAt
              user {
                username
              }
            }
          }
        }
      }
    }
  }
`;

export const DELETE_REVIEW = gql `
  mutation DeleteReview($deleteReviewId:ID!){
    deleteReview(id:$deleteReviewId)
  }
`