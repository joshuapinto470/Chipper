import User from "../models/Users.js";
import Tweet from '../models/Tweet.js';

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ "message": "User not found", code: -1 });

        const { Name, user_id,
            user_handle, email,
            picturePath, followers,
            following, bio, location, tweets, createdAt, bannerPath } = user

        const formattedUser = {
            Name, user_id,
            user_handle, email, picturePath,
            followers, following, bio, location, tweets, createdAt, bannerPath
        }

        return res.status(200).json(formattedUser);
    } catch (error) {
        res.status(500).json({ "message": "( /users/id ) something went wrong", error: error });
    }
}

export const whoami = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        let formatted = user;
        formatted.followers = undefined;
        formatted.following = undefined;
        formatted.password_digest = undefined;
        formatted.tweets = undefined;

        res.status(200).json({ user: formatted });
    } catch (error) {
        return res.status(500).json({ "Message": "Cannot find user", code: -1 });
    }
}

export const getFeed = async (req, res) => {
    try {
        const id = req.user.id;
        //const user = await User.findById(id);
        //const posts = user.tweets;
        //const postFeed = await Promise.all(posts.map((post_id) => Tweet.findById(post_id)));
        const postFeed = await Tweet.find();
        let formattedFeed = postFeed.filter(post => post);
        formattedFeed = formattedFeed.filter(post => !post.replied_to)

        const editedViews = formattedFeed.map((tweet) => {
            if ("views" in tweet) {
                tweet.views += 1
                return tweet;
            }
            return tweet;
        });

        formattedFeed = formattedFeed.map(({ content,
            user_id, id,
            createdAt, likes,
            replies, imagePath, views
        }) => { return { content, user_id, id, createdAt, likes, replies, imagePath, views } })

        formattedFeed = await Promise.all(formattedFeed.map(async (post) => {
            const { user_id } = post;
            const post_user = await User.findById(user_id);
            const handle = post_user.user_handle;
            const name = post_user.Name;
            const pfp_path = post_user.picturePath;
            return { ...post, handle, name, pfp_path };
        }));


        Tweet.bulkSave(editedViews).then(res => {
        }).catch((err) => console.log(err))

        res.status(200).json(formattedFeed);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: error.message,
            code: -1,
            path: req.originalUrl
        });
    }
}

export const getTweet = async (req, res) => {
    try {
        const { id } = req.params;
        const tweet = await Tweet.findById(id);
        if (!tweet) return res.status(204).json({ message: `No tweet with id ${id}`, code: -1 });
        const replies = tweet.replies;

        const repliedTweets = await Promise.all(replies.map(async (tweet) => {
            return await Tweet.findById(tweet);
        }))

        const formattedResponse = { "tweet": tweet, "replies": repliedTweets }

        res.status(200).json(formattedResponse);
    } catch (error) {
        res.status(500).json({ error: error, code: -1 });
    }
}

export const getUserTweets = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(204).json({ message: "user not found" });
        const tweets = user?.tweets;

        let user_tweets = await Promise.all(tweets.map(async (tweet) => {
            return await Tweet.findById(tweet);
        }));

        // Filter out the null tweets
        user_tweets = user_tweets.filter(tweet => tweet);
        user.password_digest = undefined;

        const formattedTweets = { "tweets": user_tweets, "user": user }

        res.status(200).json(formattedTweets);

    } catch (err) {
        res.status(500).json({
            message: "Can't get user tweets!",
            error: err,
            path: req.originalUrl
        });
    }
}

export const followUser = async (req, res) => {
    try {
        const { id } = req.body; // The ID of the user whom to follow
        const user_id = req.user.id; // The ID of the current user who's following

        if (id === user_id) return res.status(400).json({ status: "Cannot follow self", code: -1 });

        // me is following user
        const user = await User.findById(id);
        const me = await User.findById(user_id);

        const user_followers = user.followers

        if (user_followers.includes(user_id))
            return res.status(200).json({ status: "Already Following", code: 1 });

        user.followers.push(me.id);
        me.following.push(user.id);

        await me.save();
        await user.save();

        return res.status(200).json({
            status: "Followed", code: 0,
            data: [{
                followers: me.followers,
                following: me.following
            }
            ],
        }
        )
    } catch (error) {
        res.status(500).json({
            "error": error,
            code: -2,
            message: "Error in following user",
            path: req.originalUrl
        });
    }
}

export const unfollowUser = async (req, res) => {
    try {
        const { id } = req.body; // The ID of the user whom to unfollow
        const user_id = req.user.id; // The ID of the current user who's following

        if (id === user_id) return res.status(400).json({ status: "Cannot unfollow self", code: -1 });

        // me is following user
        const user = await User.findById(id);
        const me = await User.findById(user_id);

        user.followers = user.followers.filter(users => (users !== user_id));
        me.following = me.following.filter(users => (users !== id));

        await user.save();
        await me.save();

        return res.status(200).json({
            status: "Unfollowed", code: 0,
            data: [{
                followers: me.followers,
                following: me.following
            }]
        })
    } catch (error) {
        res.status(500).json({
            "error": error,
            code: -2,
            message: "Error in unfollowing user",
            path: req.originalUrl
        })
    }
}

export const likeUserPost = async (req, res) => {
    try {
        const { tweet_id } = req.body;
        const user_id = req.user.id;
        const tweet = await Tweet.findById(tweet_id);

        if (tweet.likes.includes(user_id)) return res.status(200).json({
            code: 1,
            liked: true,
            message: "Tweet Already Liked"
        })

        tweet.likes.push(user_id);
        tweet.save();

        res.status(200).json({
            code: 0,
            message: "Tweet Liked",
            liked: true,
            tweet: tweet
        })

    } catch (error) {
        res.status(500).json({
            error: error,
            code: -2,
            message: "Error in liking tweet",
            liked: null,
            path: req.originalUrl
        })
    }
}

export const dislikeTweet = async (req, res) => {
    try {
        const { tweet_id } = req.body;
        const id = req.user.id;
        const tweet = await Tweet.findById(tweet_id);

        if (!tweet) return res.status(500).json({ type: "Cannot find tweet!", code: -1, liked: null });

        tweet.likes = tweet.likes.filter((user_id) => user_id !== id);

        await tweet.save();

        res.status(200).json({
            type: "Disliked Tweet",
            code: 0,
            liked: false,
            tweet: tweet
        });

    } catch (error) {
        res.status(500).json({
            error: error,
            code: -2,
            message: "Error in disliking tweet",
            liked: null,
            path: req.originalUrl
        })
    }
}

export const getBatchUsers = async (req, res) => {
    try {
        const { users } = req.body;
        const records = await User.find({ '_id': { $in: users } });

        if (!records) res.status(500).json({
            code: -1,
            message: "Something went wrong, (Batch)",
            path: req.originalUrl
        });

        let formattedResponse = records.map(i => {
            let user = i;
            user.password_digest = undefined;
            return user;
        });

        res.status(200).json({ users: formattedResponse });
    } catch (error) {
        res.status(500).json({
            error: error,
            code: -2,
            message: "Error in batch user call",
            path: req.originalUrl
        })
    }
}

export const editUserProfile = async (req, res) => {
    try {
        const { user_name, bio, email, location } = req.body;
        const id = req.user.id;

        const user = await User.findById(id);
        if (!user) return res.status(500).json({
            Message: `Cannot find user with id ${id}`,
            code: -2
        });

        const profile_image = req.files['avatar']?.[0]?.filename || null;
        const banner_image = req.files['banner']?.[0]?.filename || null;

        user.Name = user_name || user.Name;
        user.bio = bio || user.bio;
        user.location = location || user.location;
        user.email = email || user.email;
        user.picturePath = profile_image || user.picturePath;
        user.bannerPath = banner_image || user.bannerPath;

        await user.save();
        let formattedUser = user;
        formattedUser.password_digest = undefined;
        // formattedUser.tweets = undefined;

        res.status(200).json({ user: formattedUser })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error,
            code: -1,
            path: req.originalUrl
        });
    }
}

/*
Files :  [Object: null prototype] {
  avatar: [
    {
      fieldname: 'avatar',
      originalname: '16864709449432189357728385309809.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: 'E:\\Documents\\WEB\\Testing\\Example\\server\\images\\',
      filename: 'avatar-1688043691679.jpg',
      path: 'E:\\Documents\\WEB\\Testing\\Example\\server\\images\\avatar-1688043691679.jpg',
      size: 635701
    }
  ],
  gallery: [
    {
      fieldname: 'gallery',
      originalname: 'pexels-diego-tenreiro-17016108.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: 'E:\\Documents\\WEB\\Testing\\Example\\server\\images\\',
      filename: 'gallery-1688043691682.jpg',
      path: 'E:\\Documents\\WEB\\Testing\\Example\\server\\images\\gallery-1688043691682.jpg',
      size: 275729
    },
    {
      fieldname: 'gallery',
      originalname: 'SampleJPGImage_100kbmb.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: 'E:\\Documents\\WEB\\Testing\\Example\\server\\images\\',
      filename: 'gallery-1688043691908.jpg',
      path: 'E:\\Documents\\WEB\\Testing\\Example\\server\\images\\gallery-1688043691908.jpg',
      size: 102796
    }
  ]
}*/