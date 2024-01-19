import axios from "axios";
import { Avatar, Button, Card, Progress, Textarea } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import {
  HiOutlineFaceSmile,
  HiPlayCircle,
  HiOutlineXMark,
} from "react-icons/hi2";
import { PiImage } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/userSlice";

const API_URL = import.meta.env.VITE_API_URL + "/tweet/post_tweet";
const BASE_API = import.meta.env.VITE_API_URL;

const PostTweet = () => {
  const [tweetText, setTweetText] = useState("");
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const { token, user, posts } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const uploadImage = useRef();

  useEffect(() => {
    const getAvatar = async () => {
      try {
        const res = await fetch(`${BASE_API}/assets/${user.picturePath}`);
        if (!res.ok) {
          setAvatar(null);
          return;
        }
        const data = await res.blob();
        setAvatar(URL.createObjectURL(data));
      } catch (error) {
        console.log(error);
      }
    };
    getAvatar();
  }, [user.picturePath]);

  const tweetButtonHandle = async () => {
    const tweetContent = tweetText;
    if (tweetContent === "") return;
    const formData = new FormData();
    formData.append("content", tweetContent);
    if (image) {
      formData.append("picture", image);
    }

    axios({
      method: "post",
      url: API_URL,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        setTweetText("");
        setImage(null);
        const new_id = response.data._id;
        delete response.data._id;
        // Add user information to the post and rename _id to id.
        const formatedData = {
          ...response.data,
          id: new_id,
          handle: user.user_handle,
          name: user.Name,
          pfp_path: user.picturePath,
        };
        // Sort the post from newest to oldest.
        let formatedPosts = [...posts, formatedData];
        formatedPosts.sort(function (a, b) {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
        formatedPosts.reverse();
        dispatch(
          setPosts({
            posts: formatedPosts,
          })
        );
      })
      .catch(function (response) {
        //handle error
        console.log(response);
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
    <Card className="max-w-full rounded-none hidden sm:block border-none dark:bg-black dark:border-none">
      <div className="flex flex-col items-start gap-2">
        <Avatar img={avatar || null} rounded>
          <div className="font-medium dark:text-white">
            <div>{user.Name}</div>
            <div className="text-sm font-thin text-gray-500 dark:text-gray-400">
              @{user.user_handle}
            </div>
          </div>
        </Avatar>
        <Textarea
          id="comment"
          placeholder="What's happening?"
          className="mx-auto max-w-full resize-none dark:bg-gray-900 bg-slate-50 rounded-md"
          required
          value={tweetText}
          rows={image ? 2 : 4}
          maxLength={280}
          onChange={(e) => setTweetText(e.target.value)}
        />
        {image && (
          <div className="relative">
            <Button
              color="gray"
              className="absolute top-4 left-2"
              onClick={closeImage}>
              <HiOutlineXMark className="h-5 w-5" />
            </Button>
            <img
              className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700 block "
              src={uploadedImageURL}
              alt="uploaded image"
            />
          </div>
        )}
      </div>

      {tweetText.length > 0 && (
        <Progress
          progress={(tweetText.length / 280.0) * 100}
          size="md"
          textLabel={`${tweetText.length} / 280`}
          textLabelPosition="outside"
          labelText
          color={tweetText.length === 280 ? "red" : "dark"}
        />
      )}

      <div className="flex justify-between flex-wrap gap-1">
        <div className="flex gap-1">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={uploadImage}
            onChange={handleImageUpload}
          />
          <Button
            onClick={() => uploadImage.current.click()}
            color="gray"
            className="rounded-full">
            <PiImage className="h-5 w-5" />
          </Button>
          <Button color="gray" className="rounded-full">
            <HiPlayCircle className="h-5 w-5" />
          </Button>
          <Button color="gray" className="rounded-full">
            <HiOutlineFaceSmile className="h-5 w-5" />
          </Button>
        </div>
        <Button disabled={tweetText.length === 0} onClick={tweetButtonHandle}>
          Tweet
        </Button>
      </div>
    </Card>
  );
};

export default PostTweet;

/*
<div className="flex bg-[#15202b]">
        <div className="m-2 w-10 py-1">
          <img
            className="inline-block h-10 w-10 rounded-full"
            src={`${BASE_API}/assets/${user_profile_pic}`}
            alt=""
          />
        </div>
        <div className="flex-1 px-2 pt-2 mt-2">
          <textarea
            className=" bg-transparent text-gray-400 font-medium text-lg w-full"
            rows="2"
            cols="50"
            maxLength={280}
            value={tweetText}
            placeholder="What's happening?"
            onChange={(event) => {
              setTweetText(event.target.value);
            }}
          />
        </div>
      </div>

      {image && (
        <div className="bg-cover bg-no-repeat bg-center rounded-lg relative">
          <img
            className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700"
            src={uploadedImageURL}
            alt=""
          />
          <button
            onClick={closeImage}
            className="text-[30px] absolute top-2/4 left-2/4 transform-[-50%]">
            <AiFillCloseCircle fill="#FF0000" />
          </button>
        </div>
      )}

      <hr className="border-gray-800 border-1 m-auto w-[80%]"></hr>

      <div className="flex bg-[#15202b]">
        <div className="w-10"></div>

        <div className="w-64 px-2">
          <div className="flex items-center">
            <div className="flex-1 text-center px-1 py-1 m-2">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="attachment"
                onChange={handleImageUpload}
              />
              <button
                onClick={() => {
                  document.getElementById("attachment").click();
                }}
                className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300">
                <svg
                  className="text-center h-7 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>

            <div className="flex-1 text-center py-2 m-2">
              <a
                href="#"
                className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300">
                <svg
                  className="text-center h-7 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </a>
            </div>

            <div className="flex-1 text-center py-2 m-2">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300">
                <svg
                  className="text-center h-7 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>
              {showEmojiPicker && (
                <div className="absolute">
                  <EmojiPicker
                    onEmojiClick={(emoji) => {
                      setTweetText((text) => text + emoji.emoji);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <button
            className={`
                         bg-[#1DA1F2]
                         hover:bg-blue-500 mt-5
                         active:bg-[#1d9bf0]
                         text-white font-bold
                         py-2 px-8
                         rounded-full
                         mr-8
                         float-right`}
            onClick={tweetButtonHandle}>
            Tweet
          </button>
        </div>
      </div>
      <hr className="border-gray-800 border-4"></hr>
*/
