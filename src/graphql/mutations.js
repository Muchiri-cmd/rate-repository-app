//mutations
import { gql } from '@apollo/client';

export const AUTHENTICATE_LOGIN = gql `
  mutation Authenticate($credentials:AuthenticateInput!){
    authenticate(credentials:$credentials){
      accessToken
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
