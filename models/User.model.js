import mongoose from "mongoose";

const schemaUser = new mongoose.Schema({
    nama: {
        type: String
    },
    avatar: {
        type: String,
    },
    cloudinary_id:{
        type: String
    },
});

schemaUser.method("toJSON", function(){
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

const User = mongoose.model("TestCloud", schemaUser);
export default User;
