//fragments
import { gql } from "@apollo/client"

 export const REPOSITORY_FIELDS = gql `
    fragment RepositoryFields on Repository {
      id
      fullName
      ownerAvatarUrl
      description
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      language
      url
    }
`