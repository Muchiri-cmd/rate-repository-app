import { gql } from '@apollo/client';
import { REPOSITORY_FIELDS } from './fragments';


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
  {
    me {
      id
      username
    }
  }
`

export const GET_REPOSITORY = gql`
    query GetRepository($id:ID!){
      repository(id: $id){
        ...RepositoryFields
        reviews {
          edges{
          node{
            id 
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          }
        }
      }
    }
    ${REPOSITORY_FIELDS}
`
