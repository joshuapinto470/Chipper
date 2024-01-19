import { Avatar, Button, Card, Tooltip } from "flowbite-react";
import { useState } from "react";
import { BiComment } from "react-icons/bi";
import { FiShare } from "react-icons/fi";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dislikeTweetAPI, likeTweetAPI } from "../controllers/API";
import ReplyTweetModel from "../Models/ReplyTweetModel";
import ImageModel from "../Models/ImageModel";

const BASE_API = import.meta.env.VITE_API_URL;

const Tweet = ({
  id,
  name,
  handle,
  pfp_path,
  createdAt,
  imagePath,
  content,
  likes,
  views,
  replies,
  user_id,
}) => {
  const dateOptions = { month: "short", day: "numeric" };
  const date = new Date(createdAt).toLocaleDateString("en-IN", dateOptions);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [replyTweetModel, setReplyTweetModel] = useState(false);
  const [zoomImageModel, setZoomImageModel] = useState(false);

  const [liked, setLiked] = useState(
    likes?.findIndex((like) => like === user._id) < 0 ? false : true
  );
  const [image, setImage] = useState(imagePath);
  const [likeCount, setLikeCount] = useState(likes?.length);

  const onCloseZoomImageModal = () => {
    setZoomImageModel(false);
  };

  const handleTweet = function (e) {
    navigate(`/tweet/${id}`);
  };

  const closeReplyTweetModel = () => {
    setReplyTweetModel(false);
  };

  const handleLike = async () => {
    if (liked) {
      dislikeTweetAPI(id, token)
        .then((res) => {
          console.log("Disliking tweet!");
          setLiked(res?.liked);
          setLikeCount((c) => c - 1);
        })
        .catch((err) => {
          console.log("Dislike :", err);
        });
    } else {
      likeTweetAPI(id, token)
        .then((res) => {
          console.log("Liking tweet");
          setLiked(res?.liked);
          if (res.code === 0) setLikeCount((c) => c + 1);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Card className="rounded-none dark:bg-black dark:border-gray-500">
      <div className="flex flex-col gap-1 items-start">
        <Avatar
          img={pfp_path ? `${BASE_API}/assets/${pfp_path}` : ""}
          rounded
          onClick={() => {
            navigate(`/profile/${user_id}`);
          }}>
          <div className="font-medium">
            <div>{name}</div>
            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
              @{handle}
            </div>
          </div>
        </Avatar>
        <p
          className="font-normal text-gray-700 dark:text-gray-400 cursor-pointer ml-2 mt-1"
          onClick={handleTweet}>
          {content}
        </p>
        {image && (
          <div>
            <img
              className="mt-2 rounded-md border border-gray-100 dark:border-gray-700"
              src={`${BASE_API}/assets/${imagePath}`}
              onError={(error) => setImage(null)}
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
          <p>{replies?.length}</p>
        </Button>
        <Button color="gray" className="rounded-full" onClick={handleLike}>
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
        tweet={{ name, content, pfp_path, handle }}
      />
      <ImageModel
        visible={zoomImageModel}
        onClose={onCloseZoomImageModal}
        image_url={`${BASE_API}/assets/${imagePath}`}
      />
    </Card>
  );
};

export default Tweet;
