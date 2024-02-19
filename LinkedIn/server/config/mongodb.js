require('dotenv').config()

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sam_awed:x38fYmbV7OlAjk2a@mongodb.x3pzg5x.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function database() {
  try {
    await client.connect()
    return client.db("linkedin")
  } catch (error) {
    await client.close()
  }
}

module.exports = database