import { HiOutlineHeart, HiHeart } from "react-icons/hi2"
import { FiShare } from "react-icons/fi";
import { BiBarChart, BiComment } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { dislikeTweetAPI, likeTweetAPI } from "../controllers/API";
import ReplyTweetModel from "../Models/ReplyTweetModel";

const BASE_API = import.meta.env.VITE_API_URL;

const Tweet = ({ id, name, handle, pfp_path, createdAt, imagePath, content, likes, views, replies, user_id }) => {
  const dateOptions = {month : "short", day : "numeric"}
  const date = new Date(createdAt).toLocaleDateString("en-IN", dateOptions);
  const navigate = useNavigate();
  const token = useSelector(state => state.token);
  const user = useSelector(state => state.user);

  const [liked, setLiked] = useState(likes?.findIndex(like => like === user._id) < 0 ? false : true);
  const [likeCount, setLikeCount] = useState(likes?.length);
  const [showModel, setShowModel] = useState(false);


  const handleTweet = function (e) {
    e.preventDefault();
    if (e.target.id === "buttons") return;
    if (e.target.id === "name") return;
    console.log(e.target.id)
    navigate(`/tweet/${id}`);
  }

  const handleLike = async () => {
    if (liked) {
      dislikeTweetAPI(id, token)
        .then(res => {
          console.log("Disliking tweet!");
          setLiked(res?.liked);
          setLikeCount(c => c - 1);
        })
        .catch(err => {
          console.log("Dislike :", err);
        })
    }
    else {
      likeTweetAPI(id, token)
        .then(res => {
          console.log("Liking tweet");
          setLiked(res?.liked);
          if (res.code === 0)
            setLikeCount(c => c + 1);
        })
        .catch(err => console.log(err));
    }
  }

  const handleCloseModel = () => {
    setShowModel(false);
  }

  return (
    <div
      className="bg-[#15202b] hover:bg-gray-800 transition duration-350 ease-in-out">

      <div id="main-title" className="flex flex-shrink-0 p-4 pb-0">
        <Link id="name" to={`/profile/${user_id}`} className="flex-shrink-0 group block">
          <div className="flex items-center">
            <div>
              <img className="inline-block h-10 w-10 rounded-full"
                onClick={handleTweet}
                src={pfp_path ? `${BASE_API}/assets/${pfp_path}` : `${BASE_API}/assets/fallback.png`}
                alt="" />
            </div>
            <div className="ml-3">
              <p className="text-base leading-6 font-medium text-white">
                {name}
                <span className="text-base leading-5 font-light p-1 text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                  @{handle}
                </span>
                <span className="text-base leading-5 font-light p-1 text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                  {date}
                </span>
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="pl-16">
        <p className="text-base width-auto font-normal text-white flex-shrink mr-2.5">
          {content}
        </p>
        {
          imagePath &&
          <img className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700"
            src={`${BASE_API}/assets/${imagePath}`}
            alt="tweet image" />
        }
        <div className="flex items-center py-4">
          <div id="buttons" role="button" className="flex-1 flex items-center text-[#71767B] text-xs  hover:text-blue-400 transition duration-350 ease-in-out"
            onClick={() => setShowModel(true)}>
            <BiComment className="w-5 h-5 mr-2" />
            {replies?.length}
          </div>

          <div id="buttons" className="flex-1 flex items-center text-white text-xs  hover:text-[#F91880] transition duration-350 ease-in-out"
            onClick={handleLike}>
            {liked ?
              <HiHeart color="#F91880" className="w-5 h-5 mr-2" /> :
              <HiOutlineHeart color="#F91880" className="w-5 h-5 mr-2" />
            }
            <p>{likeCount}</p>
          </div>

          <div id="buttons" className="flex-1 flex items-center text-[#71767B] text-xs  hover:text-blue-400 transition duration-350 ease-in-out">
            <BiBarChart className="w-5 h-5 mr-2" />
            {views}
          </div>

          <div id="buttons" className="flex-1 flex items-center text-[#71767B] text-xs  hover:text-blue-400 transition duration-350 ease-in-out">
            <FiShare className="w-5 h-5 mr-2" />
          </div>
        </div>

      </div>

      <ReplyTweetModel
        visible={showModel}
        onClose={handleCloseModel}
        tweet_id={id}
      />
    </div>
  )
}

export default Tweet;