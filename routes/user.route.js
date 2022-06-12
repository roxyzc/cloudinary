import { Router } from "express";
import upload from "../utils/multer.js";
import cloud from "../utils/cloudinary.js";
import User from "../models/User.model.js";
const router = Router();

router.post("/user", upload.single("image"), async(req, res) => {
    try {
        const result = await cloud.uploader.upload(req.file.path);
        
        const newUser = new User({
            nama: req.body.nama,
            avatar: result.secure_url,
            cloudinary_id: result.public_id
        });
        
        const user = await newUser.save();
        console.log(result);
        res.send(user);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get("/users", async(req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({success: true, users}); 
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

router.get("/user/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({sucess: true, user});
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

router.delete("/user/:id", async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        await cloud.uploader.destroy(user.cloudinary_id);
        res.status(200).json({success: true, user});
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

router.get("/user/image/:nama", async(req,res) => {
    try {
        const user = await User.findOne({nama: req.params.nama});
        res.send(cloud.image(user.cloudinary_id, {transformation:[
            {height: 400, width: 400, crop: "crop", gravity: "face"},
            {radius: "max"},
            {width: 200, crop: "scale"}
        ]}));
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

router.put("/user/:id", upload.single("image"), async(req, res) => {
    try {
        const data = await User.findById(req.params.id);
        await cloud.uploader.destroy(data.cloudinary_id);
        const result = await cloud.uploader.upload(req.file.path);
        const user = await User.findByIdAndUpdate(req.params.id, {
            nama: req.body.nama || data.nama,
            avatar: result.secure_url || data.avatar,
            cloudinary_id: result.public_id || data.cloudinary_id,
        },{new: true});
        res.status(200).json({success: true, user});
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

export default router;