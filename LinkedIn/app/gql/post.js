import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation Mutation($post: PostInput) {
    createPost(post: $post) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_POSTS = gql`
  query Query {
    posts {
      _id
      content
      imgUrl
      tags
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
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
`

export const LIKE_POST = gql`
  mutation Mutation($like: LikeInput) {
    createLike(like: $like) {
      username
      createdAt
      updatedAt
    }
  }
`

export const GET_POST = gql`
  query Query($postId: ID) {
    post(postId: $postId) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
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
`

export const COMMENT_POST = gql`
  mutation Mutation($comment: CommentInput) {
    createComment(comment: $comment) {
      content
      username
      createdAt
      updatedAt
    }
  }
`