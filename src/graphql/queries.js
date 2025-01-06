import { gql } from '@apollo/client';
import { REPOSITORY_FIELDS, REVIEW_FIELDS } from './fragments';


// export const GET_REPOSITORIES = gql`
//   query{
//     repositories {
//       edges {
//         node {
//           ...RepositoryFields
//         }
//       }
//     }
//   }
//   ${REPOSITORY_FIELDS}
// `
export const GET_ORDERED_REPOSITORIES = gql`
  query GetOrderedRepositories($orderBy:AllRepositoriesOrderBy!,$orderDirection:OrderDirection!,$first:Int!,$after:String){
    repositories(orderBy:$orderBy,orderDirection:$orderDirection,first:$first,after:$after){
      edges{
        node{
          ...RepositoryFields
        }
        cursor
      }
      pageInfo{
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
  ${REPOSITORY_FIELDS}
`

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewFields
          }
        }
      }
    }
  }
  ${REVIEW_FIELDS}
`

export const GET_REPOSITORY = gql`
    query GetRepository($id:ID!,$first:Int!,$after:String){
      repository(id: $id){
        ...RepositoryFields
        reviews (first:$first,after:$after){
          totalCount
          edges {
            node{
              ...ReviewFields
            }
            cursor
          }
          pageInfo {
            endCursor
            startCursor
            hasNextPage
          }
        }
      }
    }
    ${REPOSITORY_FIELDS}
    ${REVIEW_FIELDS}
`

export const SEARCH_REPOSITORY = gql`
  query($searchKeyword:String!){
    repositories(searchKeyword:$searchKeyword){
      edges{
        node{
          ...RepositoryFields
        }
      }
    }
  }
  ${REPOSITORY_FIELDS}
`