/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose, AiFillCloseCircle } from "react-icons/ai"
import { setPosts } from "../state";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_API = import.meta.env.VITE_API_URL;
const API_URL = BASE_API + "/tweet/reply_tweet";

const ReplyTweetModel = ({ visible, onClose, tweet_id }) => {
    const [tweetText, setTweetText] = useState(null);
    const [uploadedImageURL, setUploadedImageURL] = useState(null);
    const [image, setImage] = useState(null);
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!visible) return null;

    const handleOnClose = (e) => {
        if (e.target.id === "container") onClose();
    };


    const handlePostTweet = async () => {
        const tweetContent = tweetText;
        if (!tweetContent) return;
        if (tweetContent === "") return;
        const formData = new FormData();
        formData.append("content", tweetContent);
        formData.append("tweet_id", tweet_id)
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: API_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: formData
        };

        axios.request(config)
            .then(response => {
                setTweetText(null);
                setImage(null);

                navigate(`/tweet/${tweet_id}`)
                onClose();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleImageUpload = async (e) => {
        console.log(e.target.files);
        if (e.target.files) {
            setImage(e.target.files[0]);
            setUploadedImageURL(URL.createObjectURL(e.target.files[0]));
        }
    }

    const closeImage = () => {
        setImage(null);
        setUploadedImageURL(null);
    }

    return (
        <div
            id="container"
            onClick={handleOnClose}
            className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>

            <div className="bg-[#15202b] p-2 rounded-xl flex flex-col">
                <div className="">
                    <button
                        onClick={onClose}
                        className='hover:bg-gray-800 mt-1 py-2 px-4 rounded-full m-auto'>
                        <AiOutlineClose fill="white" />
                    </button>
                </div>

                <div className="flex flex-col bg-[#15202b]">
                    <div className="flex">
                        <div className="m-2 w-10 py-1">
                            <img className="inline-block h-10 w-10 rounded-full"
                                src={`${BASE_API}/assets/fallback.png`}
                                alt="" />
                        </div>
                        <div className="flex-1 px-2 pt-2 mt-2">
                            <textarea
                                onChange={(event) => { setTweetText(event.target.value) }}
                                className="bg-transparent text-gray-400 font-medium text-lg w-full"
                                rows="4"
                                cols="50"
                                maxLength={280}
                                placeholder="What's happening?"
                            />
                        </div>
                    </div>

                    {image &&
                        <div className="flex bg-cover bg-no-repeat bg-center rounded-lg relative justify-center">
                            <img className=" mt-2 mb-2 rounded-2xl border border-gray-100 dark:border-gray-700 max-w-[500px]"
                                src={uploadedImageURL}
                                alt="" />
                            <button
                                onClick={closeImage}
                                className="text-[30px] absolute top-2/4 left-2/4 transform-[-50%]">
                                <AiFillCloseCircle fill="#FFDD00" color="black" />
                            </button>
                        </div>
                    }

                    <hr className="border-gray-800 border-1"></hr>
                    <div className="flex mt-1">

                        <div className="text-center px-1 py-1 m-1">
                            <input type="file" accept="image/*" className="hidden" id="attachment" onChange={handleImageUpload} />
                            <button
                                onClick={() => { document.getElementById("attachment").click() }}
                                className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300">
                                <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round"
                                    strokeLinejoin="round" strokeWidth="2" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                                    </path>
                                </svg>
                            </button>
                        </div>

                        <div className="flex px-1 py-1 m-1">
                            <input type="file" accept="image/*" className="hidden" id="attachment" />
                            <button
                                className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300">
                                <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round"
                                    strokeLinejoin="round" strokeWidth="2" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z">
                                    </path>
                                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </button>
                        </div>

                        <button
                            onClick={handlePostTweet}
                            className="bg-blue-400 hover:bg-blue-500 mt-5 active:bg-[#1d9bf0] text-white font-bold rounded-full float-right mr-8 py-2 px-4 m-auto">
                            Tweet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReplyTweetModel