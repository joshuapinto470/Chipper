import { useState } from "react";
import { BiComment } from "react-icons/bi";
import { FiShare } from "react-icons/fi";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { dislikeTweetAPI, likeTweetAPI } from "../controllers/API";
import { Avatar, Button, Card, Tooltip } from "flowbite-react";
import ImageModel from "../Models/ImageModel";

const BASE_API = import.meta.env.VITE_API_URL;

const TweetCard = ({
  id,
  content,
  user_name,
  user_handle,
  views,
  replies,
  date,
  pfp,
  tweet_image,
  likes,
}) => {
  const pfp_path = pfp || "fallback.png";
  const { user, token } = useSelector((state) => state.user);
  const [likeCount, setLikeCount] = useState(likes?.length);
  const [imageModel, setImageModel] = useState(false);
  const [liked, setLiked] = useState(
    likes?.findIndex((like) => like === user._id) < 0 ? false : true
  );

  const onClose = () => {
    setImageModel(false);
  }

  const handleLike = async () => {
    if (liked) {
      dislikeTweetAPI(id, token)
        .then((res) => {
          console.log("Disliking tweet!");
          setLiked(res?.liked);
        })
        .catch((err) => {
          console.log("Dislike :", err);
        });
    } else {
      likeTweetAPI(id, token)
        .then((res) => {
          console.log("Liking tweet");
          setLiked(res?.liked);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Card className="rounded-none shadow-sm">
      <div className="flex flex-col gap-2 items-start">
        <div>
          <Avatar
            img={`${BASE_API}/assets/${pfp_path}`}
            alt="profile image"
            rounded>
            <div className="font-medium">
              <div>{user_name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                @{user_handle}
              </div>
            </div>
          </Avatar>
        </div>
        <div>
          <p className="ml-1">{content}</p>
        </div>
        {tweet_image && (
          <div>
            <img
              className="mt-2 rounded-md border dark:border-gray-700"
              src={`${BASE_API}/assets/${tweet_image}`}
              alt="tweet image"
              onClick={()=> setImageModel(true)}
            />
          </div>
        )}
        <div>
          <div className="flex gap-3">
            <p className="ml-1">2:28AM</p>
            <p>June 17, 2023</p>
            <p>
              <span className="font-slate-50 mr-1">{views}</span>views
            </p>
          </div>
        </div>
        <hr className="border-1 m-auto w-[99%]" />
        <div>
          <div className="flex gap-3 justify-start items-center max-w-full">
            <Button color="gray" className="rounded-full">
              <BiComment className="mr-2" />
              <p>4</p>
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
        </div>
        <hr className="border-1 m-auto w-[99%]" />
      </div>
      <ImageModel visible={imageModel} onClose={onClose} image_url={`${BASE_API}/assets/${tweet_image}`} />
    </Card>
  );
};

export default TweetCard;