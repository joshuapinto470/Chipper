import { useState } from "react";
import { BiComment } from "react-icons/bi";
import { FiShare } from "react-icons/fi";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { dislikeTweetAPI, likeTweetAPI } from "../controllers/API";

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
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [liked, setLiked] = useState(
    likes?.findIndex((like) => like === user._id) < 0 ? false : true
  );

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
    <div className="">
      <div className="flex flex-shrink-0 p-4 pb-0">
        <a className="flex-shrink-0 group block">
          <div className="flex items-center">
            <div>
              <img
                src={`${BASE_API}/assets/${pfp_path}`}
                alt=""
                className="inline-block h-12 w-12 rounded-full"
              />
            </div>
            <div className="ml-3">
              <p className="text-base leading-6 font-medium">
                {user_name}
                <br />
                <span className="text-base leading-5 font-light ">
                  @{user_handle}
                </span>
              </p>
            </div>
          </div>
        </a>
      </div>

      <div className="pl-5 mt-4 mb-2">
        <p className="text-[17px] width-auto font-normal  flex-shrink mr-2.5">
          {content}
        </p>
        {tweet_image && (
          <img
            className="mt-2 rounded-2xl border dark:border-gray-700"
            src={`${BASE_API}/assets/${tweet_image}`}
            alt="tweet image"
          />
        )}
      </div>
      <div className="pl-5 mt-2 mb-2">
        <p className="">
          <span className="text-[15px] leading-5 font-normal  mr-2">
            17:32 AM ∙ June 17, 2023 ∙
          </span>
          {views}
          <span className="text-lg leading-5 font-light p-1 transition ease-in-out duration-150">
            views
          </span>
        </p>
      </div>

      <hr className="border-1 m-auto w-[94%]" />

      <div className="pl-3 m-2 flex">
        <p className=" font-bold">
          {replies}
          <span className="text-base font-light p-1 ">
            Comments
          </span>
        </p>
        <a href="#" className=" font-bold ml-2">
          {likes?.length}
          <span className="text-base font-light p-1 ">Likes</span>
        </a>
      </div>
      <hr className="border-1 m-auto w-[94%]" />

      <div className="flex items-center justify-evenly py-4 mx-4">
        <div
          id="buttons"
          role="button"
          className="text-[#71767B]  hover:text-blue-400 transition duration-350 ease-in-out">
          <BiComment className="w-6 h-6 mr-2" />
        </div>

        <div
          onClick={handleLike}
          id="buttons"
          className="text-[#71767B] hover:text-[#F91880] transition duration-350 ease-in-out">
          {liked ? (
            <HiHeart className="w-6 h-6 mr-2" color="#F91880" />
          ) : (
            <HiOutlineHeart className="w-6 h-6 mr-2" />
          )}
        </div>

        <div
          id="buttons"
          className="text-[#71767B] hover:text-blue-400 transition duration-350 ease-in-out">
          <FiShare className="w-6 h-6 mr-2" />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default TweetCard;
