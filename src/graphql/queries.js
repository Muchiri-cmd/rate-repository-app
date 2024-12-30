import { gql } from '@apollo/client';
import { REPOSITORY_FIELDS, REVIEW_FIELDS } from './fragments';


export const GET_REPOSITORIES = gql`
  query{
    repositories {
      edges {
        node {
          ...RepositoryFields
        }
      }
    }
  }
  ${REPOSITORY_FIELDS}
`
export const GET_ORDERED_REPOSITORIES = gql`
  query GetOrderedRepositories($orderBy:AllRepositoriesOrderBy!,$orderDirection:OrderDirection!){
    repositories(orderBy:$orderBy,orderDirection:$orderDirection){
      edges{
        node{
          ...RepositoryFields
        }
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
    query GetRepository($id:ID!){
      repository(id: $id){
        ...RepositoryFields
        reviews {
          edges{
          node{
           ...ReviewFields
          }
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