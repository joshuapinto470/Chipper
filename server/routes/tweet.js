import express from "express";
import {postTweet, replyTweet } from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer";
import { customAlphabet } from 'nanoid'

const router = express.Router();
const nanoid = customAlphabet('1234567890abcdef', 22)

// const storage = multer.diskStorage({
//     destination : function(req, file, cb) {
//         cb(null, "public/assets");
//     },
//     filename : function(req, file, cb) {
//         if (file){
//             const extension = file.originalname.split('.').pop();
//             const fileName = nanoid() + '.' + extension;
//             req.body.picturePath = fileName;
//             cb(null, fileName);
//         }
//     },
// });

const storage = multer.memoryStorage();

const upload = multer({storage});

router.post("/post_tweet", verifyToken, upload.single("picture"), postTweet);
router.post("/reply_tweet", verifyToken, upload.single("picture"), replyTweet);

export default router;