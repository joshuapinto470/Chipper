/* eslint-disable react/prop-types */
import axios from "axios";
import { Avatar, Modal, Textarea, Button } from "flowbite-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/userSlice";
import {
  HiOutlineFaceSmile,
  HiPlayCircle,
  HiOutlineXMark,
} from "react-icons/hi2";
import { PiImage } from "react-icons/pi";

const BASE_API = import.meta.env.VITE_API_URL;
const API_URL = BASE_API + "/tweet/post_tweet";

const PostTweetModel = ({ visible, onClose }) => {
  const [tweetText, setTweetText] = useState("");
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const [image, setImage] = useState(null);
  const {token, user, posts} = useSelector((state) => state.user)
  const tweetInputRef = useRef(null);
  const uploadImage = useRef();
  const dispatch = useDispatch();

  const profile_pic = user.picturePath || "fallback.png";

  if (!visible) return null;

  const handleOnClose = (e) => {
    setTweetText("");
    onClose();
  };

  const handlePostTweet = async () => {
    const tweetContent = tweetText;
    if (!tweetContent) return;
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
      .then((res) => {
        setTweetText("");
        setImage(null);
        const new_id = res.data._id;
        delete res.data._id;

        const formatedData = {
          ...res.data,
          id: new_id,
          handle: user.user_handle,
          name: user.Name,
          pfp_path: user.picturePath,
        };

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

        onClose();
      })
      .catch((err) => console.log(err));
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
      popup>
      <Modal.Header />
      <Modal.Body>
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
              placeholder="What is happening?!"
              className="max-w-full resize-none dark:bg-gray-900"
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
                  className="absolute top-4 left-2 rounded-full"
                  onClick={closeImage}>
                  <HiOutlineXMark className="h-4 w-4" />
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
                  onClick={() => uploadImage.current.click()}>
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
                onClick={handlePostTweet}>
                Tweet
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PostTweetModel;
