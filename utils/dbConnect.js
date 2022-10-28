/* This is a database connection function*/
import mongoose from "mongoose";

const connection = {}; /* creating connection object*/

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return;
  }

  // Connection string should be in env vars, but I used constant value for now
  const db = await mongoose.connect(
    "mongodb+srv://lai:QiTh7DAGdL5hdMMH@cluster0.ngtpjym.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
