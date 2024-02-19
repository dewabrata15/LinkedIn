const typeDefs = `#graphql
  type User {
    _id: ID
    name: String
    username: String
    email: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Token {
    access_token: String
  }
  
  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
  }

  type FollowUser {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
    user: User
  }
  
  type UserFollow {
    _id: ID
    name: String
    username: String
    email: String
    follower: [FollowUser]
    following: [FollowUser]
  }

  type Query {
    user(userId: String, myself: Boolean): UserFollow
    users(search: String): [User]
  }

  type Mutation {
    register(user: UserInput): User
    login(email: String!, password: String!): Token
    follow(userId: String!): Follow
  }
`;

module.exports = typeDefs