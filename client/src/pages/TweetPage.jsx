/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import HomeHeader from "../widgets/HomeHeader";
import Sidebar from "../components/Sidebar";
import SearchBar from "../widgets/SearchBar";
import { BottomBar } from "../widgets/BottomBar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TweetCard from "../widgets/TweetCard";
import { getUserTweet, getUserInfo } from "../controllers/API.js"


const TweetPage = () => {
    const { tweet_id } = useParams();
    const token = useSelector((state) => state.token);
    const [tweet, setTweet] = useState();
    const [replies, setReplies] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        getUserTweet(tweet_id, token)
        .then((response) => {
            setTweet(response.tweet);
            setReplies(response.replies);
            return getUserInfo(response.tweet.user_id, token);
        })
        .then((user_response) => {
            setUser(user_response);
        })
        .catch(err => console.log("Error : ", err));
    }, []);

    if (!tweet) return <p>TWEET NULL</p>
    // if (!replies) return <p>REPLIES NULL</p>
    if (!user) return <p>USER NULL</p>

    return (
        <>
            <div className="lg:p-relative lg:h-screen bg-[#15202b]">
                <div className="lg:flex lg:justify-center">
                    <div className="hidden lg:block">
                        <Sidebar />
                    </div>
                    <main role="main">
                        <div className="lg:flex lg:w-[990px]">
                            <section className="lg:w-3/5 lg:border lg:border-y-0 lg:border-gray-800 lg:max-w-[600px]">
                                <HomeHeader />
                                <hr className="border-gray-800"></hr>
                                <TweetCard
                                    content={tweet?.content}
                                    user_handle={user?.user_handle}
                                    user_name={user?.Name}
                                    date={"19:07 17th June 2023"}
                                    views={tweet?.views}
                                    replies={tweet.replies?.length}
                                    pfp={user.picturePath}
                                    tweet_image={tweet.imagePath}
                                />
                                <BottomBar />
                            </section>

                            <aside className="lg:w-2/5 lg:h-12 lg:position-relative">
                                <div className="max-w-[350px]">
                                    <div className="overflow-y-auto fixed h-screen">
                                        <SearchBar />
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default TweetPage