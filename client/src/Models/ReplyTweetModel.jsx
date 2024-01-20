/* eslint-disable react/prop-types */
import axios from "axios";
import { Avatar, Button, Textarea, Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import {
  HiOutlineFaceSmile,
  HiOutlineXMark,
  HiPlayCircle,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PiImage } from "react-icons/pi";

const BASE_API = import.meta.env.VITE_API_URL;
const API_URL = BASE_API + "/tweet/reply_tweet";

const ReplyTweetModel = ({ visible, onClose, tweet_id, tweet }) => {
  const [tweetText, setTweetText] = useState("");
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const [image, setImage] = useState(null);
  const { token, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tweetInputRef = useRef(null);
  const uploadImage = useRef();
  const profile_pic = user.picturePath || null;

  if (!visible) return null;

  const handleOnClose = (e) => {
    onClose();
  };

  const handlePostTweet = async () => {
    const tweetContent = tweetText;
    if (!tweetContent) return;
    if (tweetContent === "") return;
    const formData = new FormData();
    formData.append("content", tweetContent);
    formData.append("tweet_id", tweet_id);
    if (image) {
      formData.append("picture", image);
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: API_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    };

    axios
      .request(config)
      .then((response) => {
        setTweetText("");
        setImage(null);

        navigate(`/tweet/${tweet_id}`);
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageUpload = async (e) => {
    console.log(e.target.files);
    if (e.target.files) {
      setImage(e.target.files[0]);
      setUploadedImageURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  const closeImage = () => {
    setImage(null);
    setUploadedImageURL(null);
  };

  return (
    <Modal
      dismissible
      show={visible}
      initialFocus={tweetInputRef}
      size="lg"
      onClose={handleOnClose}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="flex mb-2 gap-1">
          <div className="flex flex-col min-w-10">
            <Avatar
              img={
                tweet.pfp_path ? `${BASE_API}/assets/${tweet.pfp_path}` : null
              }
            />
            <div className="flex-grow">
              <svg viewBox="0 0 100 100">
                <line x1="50" y1="0" x2="50" y2="100" stroke="black" />
              </svg>
            </div>
          </div>
          <div className=" flex flex-col gap-1 ml-2">
            <div className="flex gap-1">
              <p className="font-bold">{tweet.name}</p>
              <span className="font-thin">@{tweet.handle}</span>
            </div>
            <div>
              <p>{tweet.content}</p>
            </div>
            <div>
              <p className="text-blue-600">
                <span className="text-slate-500 mr-1">Replying to</span>@
                {tweet.handle}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="hidden sm:block">
            <Avatar
              img={
                user.picturePath ? `${BASE_API}/assets/${profile_pic}` : null
              }
              alt="avatar"
              rounded
            />
          </div>
          <div className="flex-grow">
            <Textarea
              ref={tweetInputRef}
              id="comment"
              placeholder="Post your reply"
              className="max-w-full resize-none  bg-white dark:bg-gray-900"
              required
              value={tweetText}
              rows={3}
              maxLength={280}
              onChange={(e) => setTweetText(e.target.value)}
            />

            {image && (
              <div className="relative">
                <Button
                  color="gray"
                  className="absolute top-4 left-2"
                  onClick={closeImage}
                >
                  <HiOutlineXMark className="h-5 w-5" />
                </Button>
                <img
                  className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700 block "
                  src={uploadedImageURL}
                  alt="uploaded image"
                />
              </div>
            )}

            <hr className="mt-2"></hr>

            <div className="flex justify-between mt-2">
              <div className="flex gap-1">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={uploadImage}
                  onChange={handleImageUpload}
                />
                <Button
                  color="gray"
                  className="rounded-full"
                  onClick={() => uploadImage.current.click()}
                >
                  <PiImage className="h-5 w-5" />
                </Button>
                <Button color="gray" className="rounded-full">
                  <HiPlayCircle className="h-5 w-5" />
                </Button>
                <Button color="gray" className="rounded-full">
                  <HiOutlineFaceSmile className="h-5 w-5" />
                </Button>
              </div>
              <Button
                disabled={tweetText.length === 0}
                onClick={handlePostTweet}
              >
                Tweet
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReplyTweetModel;
