const database = require("../config/mongodb")
const { ObjectId } = require("mongodb")

class PostController {
  static async collection() {
    const db = await database()
    return db.collection("posts")
  }

  static async get() {
    const coll = await this.collection()
    const posts = await coll.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $set: { user: { $first: '$user'} }
      },
      {
        $project: {
          "user.password": 0
        }
      }
    ]).toArray()
    return posts
  }

  static async findById(_id) {
    const coll = await this.collection()
    const post = await coll.findOne({ _id })
    const user = await (await database()).collection("users").findOne({ _id: post.authorId })

    return {
      ...post,
      user
    }
  }

  static async create(args, auth) {
    const { content, imgUrl } = args.post
    const tags = args.post.tags || []
    const authorId = auth._id
    const createdAt = new Date()
    const updatedAt = new Date()

    const coll = await this.collection()
    const post = await coll.insertOne({
      content,
      tags,
      imgUrl,
      authorId,
      likes: [],
      comments: [],
      createdAt,
      updatedAt
    })

    return {
      _id: post.insertedId,
      content,
      tags,
      imgUrl,
      authorId,
      likes: [],
      comments: [],
      createdAt,
      updatedAt
    }
  }

  static async comment(args, auth) {
    const { content, postId } = args.comment
    const username = auth.username
    const createdAt = new Date()
    const updatedAt = new Date()

    const coll = await this.collection()
    await coll.updateOne({
      _id: new ObjectId(postId)
    }, {
      $push: {
        comments: {
          content,
          username,
          createdAt,
          updatedAt
        }
      }
    })

    return {
      content,
      username,
      createdAt,
      updatedAt
    }
  }

  static async like(args, auth) {
    const postId = new ObjectId(args.like.postId)
    const username = auth.username
    const createdAt = new Date()
    const updatedAt = new Date()

    const coll = await this.collection()
    const post = await this.findById(postId)
    post.likes.forEach(element => {
      if(element.username === username) {
        throw new Error("Already Like")
      }
    })

    await coll.updateOne({
      _id: new ObjectId(postId)
    }, {
      $push: {
        likes: {
          username,
          createdAt,
          updatedAt
        }
      }
    })

    return {
      username,
      createdAt,
      updatedAt
    }
  }
}

module.exports = PostController