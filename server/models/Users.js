import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true,
        min : 2,
        max : 50,
    },
    user_handle : {
        type : String,
        required : true,
        min : 1,
        max : 16,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        max : 50,
        unique : true,
    },
    password_digest : {
        type : String,
        required : true,
        min: 5,
    },
    picturePath : {
        type : String,
        default : "fallback.png",
    },
    bannerPath : {
        type : String,
        default : null,
    },
    followers : {
        type : Array,
        default : [],
    },
    following : {
        type : Array,
        default: [],
    },
    bio : {
        type : String,
        max : 150,
    },
    location : {
        type: String,
        max : 50,
    },
    tweets : {
        type : Array,
        default : []
    }
}, {timestamps : true}
);

const User = mongoose.model("User", UserSchema);

export default User;