//mutations
import { gql } from '@apollo/client';

export const AUTHENTICATE_LOGIN = gql `
  mutation Authenticate($credentials:AuthenticateInput!){
    authenticate(credentials:$credentials){
      accessToken
    }
  }
`