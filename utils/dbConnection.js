const mongoose = require("mongoose")
const URL = 'mongodb://localhost:27017/shrimp';//the database name will be "shrimp"
const connection = {};

async function dbConnect() {
  if (connection.isConnected) return;

  const db = await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected)
}

module.exports =dbConnect
// export default dbConnect;