import express from "express";
import { config } from "dotenv";
import { connectDb } from "./utils/database/connectDb.js";
import router from "./routes/user.route.js";
const app = express();

config();
connectDb();

app.use(express.json());
app.use("/api", router);
app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening at port ${process.env.PORT}`);
});