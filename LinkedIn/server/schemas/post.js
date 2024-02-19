const typeDefs = `#graphql
  type Post {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
    comments: [Comment]
    likes: [Like]
    createdAt: String
    updatedAt: String
    user: User
  }

  input PostInput {
    content: String!
    tags: [String]
    imgUrl: String
  }

  type Comment {
    content: String
    username: String
    createdAt: String
    updatedAt: String
  }

  input CommentInput {
    content: String!
    postId: ID!
  }

  type Like {
    username: String
    createdAt: String
    updatedAt: String
  }

  input LikeInput {
    postId: ID!
  }

  type Query {
    posts: [Post]
    post(postId: ID): Post
  }

  type Mutation {
    createPost(post: PostInput): Post
    createComment(comment: CommentInput): Comment
    createLike(like: LikeInput): Like 
  }
`;

module.exports = typeDefs