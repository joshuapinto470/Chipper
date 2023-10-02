import Tweet from '../models/Tweet.js';
import User from '../models/Users.js';

export const postTweet = async (req, res) => {
    try {
        const {
            content,
            picturePath,
        } = req.body;

        const isValid = content ?? picturePath;
        if (!isValid) return res.status(400).json({"Error" : "Empty tweet"});

        const id = req.user.id;
        const picture = picturePath ?? null

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ type: "something horribly went wrong" });

        const newTweet = new Tweet({
            content,
            user_id: id,
            likes: [],
            replies: [],
            replied_to: null,
            imagePath: picture,
            views: 0,
        });


        const savedTweet = await newTweet.save();
        user.tweets.push(savedTweet._id);
        await user.save();

        res.status(201).json(savedTweet);
    } catch (error) {
        res.status(500).json({ type: "Error creating tweet", error: error.message });
    }
};

export const replyTweet = async (req, res) => {
    try {
        /**
         * content -> The content of the tweet.
         * picturePath -> The path of the image that the tweet contains (if any)
         * tweet_id -> The tweet that the user is replying to.
         */
        const { content, picturePath, tweet_id } = req.body;
        const id = req.user.id; // The id of the user


        const tweet = await Tweet.findById(tweet_id);
        const user = await User.findById(id);
        if (!tweet) return res.status(500).json({ type: "Cannot find tweet" });
        if (!user) return res.status(500).json({ type: "Cannot find user! This should NOT happen" });

        const replyTweet = new Tweet({
            content,
            user_id: id,
            likes: [],
            replies: [],
            replied_to: tweet_id,
            imagePath: picturePath,
            views: 0,
        });

        const savedTweet = await replyTweet.save();
        tweet.replies.push(savedTweet._id);
        user.tweets.push(savedTweet._id);

        await tweet.save();
        await user.save();

        res.status(201).json(savedTweet);

    } catch (error) {
        res.status(500).json({ type: "Error creating tweet", error: error.message });
    }
}

