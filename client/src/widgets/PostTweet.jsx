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
  const [loading, setLoading] = useState(false);
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

  const tweetHandler = async () => {
    setLoading(true);
    if (!tweetText.length) return;
    const formData = new FormData();
    formData.append('content', tweetText);
    image && formData.append('picture', image);


    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData
      });

      if (!res.ok) {
        throw new Error('Something went wrong posting tweet');
      }

      const data = await res.json();

      const new_id = data._id;
      delete data._id;

      const formattedData = {
        ...data,
        id: new_id,
        handle: user.user_handle,
        name: user.Name,
        pfp_path: user.picturePath,
      }

      let formatedPosts = [...posts, formattedData];
      formatedPosts.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      dispatch(
        setPosts({
          posts: formatedPosts,
        })
      );

    } catch (error) {
      console.error(error.message);
    } finally {
      closeImage();
      setTweetText('');
      setLoading(false);
    }
  }

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
        <Button disabled={(tweetText.length === 0) || loading} onClick={tweetHandler}>
          Tweet
        </Button>
      </div>
    </Card>
  );
};

export default PostTweet;