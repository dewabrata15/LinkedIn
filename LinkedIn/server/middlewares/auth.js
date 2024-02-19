const { ObjectId } = require("mongodb")
const { verifyToken } = require("../helpers/jwt")
const UserController = require("../controllers/user")

async function authentication(req) {
  try {
    const { authorization } = req.headers
    if(!authorization) {
      throw new Error
    }
    
    const token = authorization.split(" ")
    if(token.length < 2) {
      throw new Error
    }
  
    if(token[0] !== "Bearer") {
      throw new Error
    }
    
    const access_token = verifyToken(token[1])
    if(!access_token._id) {
      throw new Error
    }
  
    const user = await UserController.findById(new ObjectId(access_token._id))
    if(!user) {
      throw new Error
    }
    
    return {
      _id: user._id,
      username: user.username
    }
  } catch (error) {
    throw new Error("Invalid Token")
  }
}

module.exports = {
  authentication
}