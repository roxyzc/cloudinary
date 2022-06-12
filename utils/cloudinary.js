import cloudinary from "cloudinary";
import {config} from "dotenv";
const cloud = cloudinary.v2;

config();

cloud.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

export default cloud;