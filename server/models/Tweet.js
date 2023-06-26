import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema({
    user_id : String,
    content : {
        type : String,
        max : 50,
    },
    imagePath : {
        type : String,
        default: null,
    },
    likes : {
        type : Array,
        default : [],
    },
    replies : {
        type : Array,
        default : [],
    },
    replied_to : {
        type : String,
        default : null,
    },
    views : {
        type : Number,
        default: 0,
    }
}, {timestamps : true}
);

const Tweet = mongoose.model("Tweet", TweetSchema);

export default Tweet;