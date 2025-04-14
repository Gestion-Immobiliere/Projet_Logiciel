import mongoose from "mongoose";

const connectDB = async () => {
   mongoose.connection.on('connected', () => console.log("Database connected"))

   await mongoose.connect(`${process.env.MONGODB_URI}/test2`) //lorsqu'on établiera la connection a la base de donne ca creera automaatiquement une base de donne nomme test
} 
export default connectDB