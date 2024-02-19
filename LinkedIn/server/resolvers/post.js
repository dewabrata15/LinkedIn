const PostController = require("../controllers/post")
const { ObjectId } = require("mongodb")

const resolvers = {
  Query: {
    posts: async () => {
      const posts = await PostController.get()
      return posts
    },
    post: async (_, args) => {
      const post = await PostController.findById(new ObjectId(args.postId))
      return post
    }
  },
  Mutation: {
    createPost: async (_, args, context) => {
      try {
        const auth = await context.authentication()
        const createdPost = await PostController.create(args, auth)
        return createdPost
      } catch (error) {
        throw new Error(error)
      }
    },
    createComment: async (_, args, context) => {
      try {
        const auth = await context.authentication()
        const createdComment = await PostController.comment(args, auth)
        return createdComment
      } catch (error) {
        throw new Error(error)
      }
    },
    createLike: async (_, args, context) => {
      try {
        const auth = await context.authentication()
        const createdLike = await PostController.like(args, auth)
        return createdLike
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}

module.exports = resolvers