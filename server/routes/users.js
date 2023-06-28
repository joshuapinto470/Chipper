import express from "express";
import {getTweet, getFeed, 
    getUser, getUserTweets, 
    followUser, unfollowUser, likeUserPost, whoami, dislikeTweet, getBatchUsers} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

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

export default router;