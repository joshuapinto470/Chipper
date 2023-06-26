import { BiComment } from "react-icons/bi";
import { FiShare } from "react-icons/fi";
import { HiOutlineHeart } from "react-icons/hi2"


const BASE_API = import.meta.env.VITE_API_URL;

const TweetCard = ({ content, user_name, user_handle, views, replies, date, pfp, tweet_image }) => {
    const pfp_path = pfp ? pfp : "fallback.png";
    return (
        <div className="bg-[#15202b]">
            <div className="flex flex-shrink-0 p-4 pb-0">
                <a className="flex-shrink-0 group block">
                    <div className="flex items-center">
                        <div>
                            <img src={`${BASE_API}/assets/${pfp_path}`} alt=""
                                className="inline-block h-12 w-12 rounded-full" />
                        </div>
                        <div className="ml-3">
                            <p className="text-base leading-6 font-medium text-white">
                                {user_name}<br />
                                <span className="text-base leading-5 font-light text-gray-400">
                                    @{user_handle}
                                </span>
                            </p>
                        </div>
                    </div>
                </a>
            </div>

            <div className="pl-5 mt-4 mb-2">
                <p className="text-[17px] width-auto font-normal text-white flex-shrink mr-2.5">
                    {content}
                </p>
                {
                tweet_image &&
                <img className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700"
                    src={`${BASE_API}/assets/${tweet_image}`}
                    alt="tweet image" />
                }
            </div>
            <div className="pl-5 mt-2 mb-2">
                <p className="text-white">
                    <span className="text-[15px] leading-5 font-normal text-gray-400 mr-2">
                        17:32 AM ∙ June 17, 2023 ∙
                    </span>
                    {views}
                    <span className="text-lg leading-5 font-light p-1 text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                        views
                    </span>
                </p>
            </div>

            <hr className="border-gray-800 border-1 m-auto w-[94%]" />

            <div className="pl-3 m-2">
                <p className="text-white font-bold">{replies}
                    <span className="text-base font-light p-1 text-gray-400">
                        Comments
                    </span>
                </p>
            </div>
            <hr className="border-gray-800 border-1 m-auto w-[94%]" />

            <div className="flex items-center justify-evenly py-4 mx-4">
                <div id="buttons" role="button" className="text-[#71767B]  hover:text-blue-400 transition duration-350 ease-in-out">
                    <BiComment className="w-6 h-6 mr-2" />
                </div>

                <div id="buttons" className="text-[#71767B]   hover:text-[#F91880] transition duration-350 ease-in-out">
                    <HiOutlineHeart className="w-6 h-6 mr-2" />
                </div>

                <div id="buttons" className="text-[#71767B] hover:text-blue-400 transition duration-350 ease-in-out">
                    <FiShare className="w-6 h-6 mr-2" />
                </div>
            </div>
            <hr className="border-gray-800" />
        </div>
    )
}

export default TweetCard