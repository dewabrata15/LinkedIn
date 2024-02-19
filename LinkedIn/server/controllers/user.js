const database = require("../config/mongodb")
const { hashPassword } = require("../helpers/bcrypt")
const { ObjectId } = require("mongodb")

class UserController {
  static async collection() {
    const db = await database()
    return db.collection("users")
  }

  static async findById(_id) {
    const coll = await this.collection()
    const user = await coll.findOne({ _id })
    const following = await (await database()).collection("follows").aggregate([
      { $match: { followerId: new ObjectId(_id) } },
      {
        $lookup: {
          from: "users",
          localField: "followingId",
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

    const follower = await (await database()).collection("follows").aggregate([
      { $match: { followingId: new ObjectId(_id) } },
      {
        $lookup: {
          from: "users",
          localField: "followerId",
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

    return {
      ...user,
      follower,
      following
    }
  }

  static async findByEmail(email) {
    const coll = await this.collection()
    const user = await coll.findOne({ email })
    return user
  }

  static async findByUsername(username) {
    const coll = await this.collection()
    const user = await coll.findOne({ username })
    return user
  }

  static async search(input) {
    const coll = await this.collection()
    const users = await coll.find({
      $or: [
        { username: { $regex: input, $options: 'i' } },
        { name: { $regex: input, $options: 'i' } }
      ]
    }).toArray()

    return users
  }

  static async create(username, email, password) {
    const hashedPassword = hashPassword(password)
    const coll = await this.collection()
    const user = await coll.insertOne({
      name: username, username, email, password: hashedPassword
    })
    return user
  }

  static async follow(args, auth) {
    const followingId = new ObjectId(args.userId)
    const followerId = auth._id
    const createdAt = new Date()
    const updatedAt = new Date()

    if(followingId.toString() === followerId.toString()) {
      throw new Error("Can't Follow")
    }

    const db = await database()
    const followed = await db.collection("follows").find({
      followerId
    }).toArray()

    followed.forEach(element => {
      if(element.followingId.toString() === followingId.toString()) {
        throw new Error("Already Follow")
      }
    })

    const createdFollow = await db.collection("follows").insertOne({
      followingId,
      followerId,
      createdAt,
      updatedAt
    })

    return {
      _id: createdFollow.insertedId,
      followingId,
      followerId,
      createdAt,
      updatedAt
    }
  }
}

module.exports = UserController