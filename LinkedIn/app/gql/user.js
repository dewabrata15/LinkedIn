import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Mutation($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      access_token
    }
  }
`

export const REGISTER = gql`
  mutation Mutation($user: UserInput) {
    register(user: $user) {
      _id
      name
      username
      email
    }
  }
`

export const FOLLOW = gql`
  mutation Mutation($userId: String!) {
    follow(userId: $userId) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
`

export const SEARCH = gql`
  query Query($search: String) {
    users(search: $search) {
      _id
      name
      username
      email
    }
  }
`

export const USER = gql`
  query Query($userId: String, $myself: Boolean) {
    user(userId: $userId, myself: $myself) {
      _id
      name
      username
      email
      follower {
        _id
        followingId
        followerId
        createdAt
        updatedAt
        user {
          _id
          name
          username
          email
        }
      }
      following {
        _id
        followingId
        followerId
        createdAt
        updatedAt
        user {
          _id
          name
          username
          email
        }
      }
    }
  }
`