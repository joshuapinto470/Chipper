import { Avatar, Button, Card, Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import { BiComment } from "react-icons/bi";
import { FiShare } from "react-icons/fi";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImageModel from "../Models/ImageModel";
import ReplyTweetModel from "../Models/ReplyTweetModel";

const BASE_API = import.meta.env.VITE_API_URL;

const Tweet = ({ id, post }) => {
  // const dateOptions = { month: "short", day: "numeric" };
  // const date = new Date(createdAt).toLocaleDateString("en-IN", dateOptions);
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.user);

  const [replyTweetModel, setReplyTweetModel] = useState(false);
  const [zoomImageModel, setZoomImageModel] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [liked, setLiked] = useState(
    post.likes?.findIndex((like) => like === user._id) < 0 ? false : true
  );
  const [likeCount, setLikeCount] = useState(post.likes?.length);

  const onCloseZoomImageModal = () => {
    setZoomImageModel(false);
  };

  const handleTweet = function (e) {
    navigate(`/tweet/${id}`);
  };

  const closeReplyTweetModel = () => {
    setReplyTweetModel(false);
  };

  useEffect(() => {
    const getAvatar = async () => {
      try {
        const res = await fetch(`${BASE_API}/assets/${post.pfp_path}`);
        if (!res.ok) {
          setAvatar(null);
          return;
        }
        const data = await res.blob();
        setAvatar(URL.createObjectURL(data));
      } catch (error) {
        console.log("Err: " + error.message);
      }
    };
    getAvatar();
  }, [post.pfp_path]);

  const LikeTweet = async () => {
    try {
      const res = await fetch(
        `${BASE_API}/user/${liked ? "dislike" : "like"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ tweet_id: id }),
        }
      );
      if (!res.ok) {
        throw new Error("Error liking tweet");
      }
      const data = await res.json();
      setLiked(data.liked);
      setLikeCount((c) => (liked ? --c : ++c));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="rounded-none dark:bg-black dark:border-gray-500">
      <div className="flex flex-col gap-1 items-start">
        <Avatar
          img={avatar || null}
          rounded
          onClick={() => {
            navigate(`/profile/${post.user_id}`);
          }}>
          <div className="font-medium">
            <div>{post.name}</div>
            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
              @{post.handle}
            </div>
          </div>
        </Avatar>
        <p
          className="font-normal text-gray-700 dark:text-gray-400 cursor-pointer ml-2 mt-1"
          onClick={handleTweet}>
          {post.content}
        </p>
        {post.imagePath && (
          <div>
            <img
              className="mt-2 rounded-md border border-gray-100 dark:border-gray-700"
              src={`${BASE_API}/assets/${post.imagePath}`}
              // onError={(error) => setImage(null)}
              onClick={() => setZoomImageModel(true)}
              alt="image"
            />
          </div>
        )}
      </div>
      {/* <hr></hr> */}
      <div className="flex gap-3 justify-between sm:justify-start items-center max-w-full">
        <Button
          color="gray"
          className="rounded-full"
          onClick={() => setReplyTweetModel(true)}>
          <BiComment className="mr-2" />
          <p>{post.replies?.length}</p>
        </Button>
        <Button color="gray" className="rounded-full" onClick={LikeTweet}>
          {liked ? (
            <HiHeart className="mr-2 h-4 w-4 text-red-500" />
          ) : (
            <HiOutlineHeart className="mr-2 h-4 w-4" />
          )}
          <p>{likeCount}</p>
        </Button>
        <Tooltip content="Share" className="ml-auto">
          <Button color="gray" className="rounded-full">
            <FiShare className="h-4 w-4" />
          </Button>
        </Tooltip>
      </div>
      <ReplyTweetModel
        visible={replyTweetModel}
        onClose={closeReplyTweetModel}
        tweet_id={id}
        tweet={{
          name: post.name,
          content: post.content,
          pfp_path: post.pfp_path,
          handle: post.handle,
        }}
      />
      <ImageModel
        visible={zoomImageModel}
        onClose={onCloseZoomImageModal}
        image_url={`${BASE_API}/assets/${post.imagePath}`}
      />
    </Card>
  );
};

export default Tweet;
