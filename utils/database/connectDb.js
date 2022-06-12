import mongoose from "mongoose";

export const connectDb = () => {
    mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.connection.on("connected", () => console.log("Connected to database successfully"));
    mongoose.connection.on("error", () => console.log("Error while connecting to database"));
}

