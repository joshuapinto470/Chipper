import express from "express";
import {
    getTweet, getFeed,
    getUser, getUserTweets,
    followUser, unfollowUser,
    likeUserPost, whoami, dislikeTweet, getBatchUsers, editUserProfile
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer";
import { customAlphabet } from 'nanoid'

const router = express.Router();
const nanoid = customAlphabet('1234567890abcdefghijklmnpqxyzABCDEFG', 22)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        if (file) {
            const extension = file.originalname.split('.').pop();
            const fileName = nanoid() + '.' + extension;
            req.body.picturePath = fileName;
            cb(null, fileName);
        }
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
    fileFilter : (req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error("Only .png, .jpeg, .jpg files are accepted");
            err.name = "ExtensionError";
            return cb(err);
        }
    },
});

const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'banner', maxCount: 1 }])

// ROUTE /user
router.get("/get_user/:id", verifyToken, getUser);
router.get("/whoami", verifyToken, whoami);
router.get("/feed", verifyToken, getFeed);
router.get("/user_tweets/:id", verifyToken, getUserTweets);
router.get("/tweet/:id", verifyToken, getTweet);

router.post("/batch/users", verifyToken, getBatchUsers);
router.post("/follow", verifyToken, followUser);
router.post("/unfollow", verifyToken, unfollowUser);
router.post("/like", verifyToken, likeUserPost);
router.post("/dislike", verifyToken, dislikeTweet);
router.post("/edit", verifyToken, cpUpload, editUserProfile);

export default router;