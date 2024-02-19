const validator = require("validator");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const UserController = require("../controllers/user");
const { ObjectId } = require("mongodb")

const resolvers = {
  Query: {
    user: async (_, args, context) => {
      let user = null
      if(args.myself === false) {
        user = await UserController.findById(new ObjectId(args.userId))
      } else {
        const auth = await context.authentication()
        user = await UserController.findById(auth._id)
      }
      return user
    },
    users: async (_, args) => {
      const users = await UserController.search(args.search)
      return users
    }
  },
  Mutation: {
    register: async (_, args) => {
      const { email, username, password } = args.user
      if(!validator.isEmail(email)) {
        throw new Error("Invalid Format Email")
      }
      if(!validator.isLength(password, { min: 5 })) {
        throw new Error("Invalid Format Password")
      }

      let user = await UserController.findByEmail(email)
      if(user) {
        throw new Error("Email Already Exists")
      }
      user = await UserController.findByUsername(username)
      if(user) {
        throw new Error("Username Already Exists")
      }

      const createdUser = await UserController.create(username, email, password)
      
      return {
        _id: createdUser.insertedId,
        name: username,
        username,
        email
      }
    },
    login: async (_, { email, password }) => {
      const user = await UserController.findByEmail(email)
      if(!user) {
        throw new Error("Invalid Email/Password")
      }
      if(!comparePassword(password, user.password)) {
        throw new Error("Invalid Email/Password")
      }
      
      return {
        access_token: signToken({ _id: user._id })
      }
    },
    follow: async (_, args, context) => {
      try {
        const auth = await context.authentication()
        const followed = await UserController.follow(args, auth)
        return followed
      } catch (error) {
        throw new Error(error)
      }
    }
  }
};

module.exports = resolvers