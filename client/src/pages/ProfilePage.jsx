/* eslint-disable react-hooks/exhaustive-deps */
import Feed from "../components/Feed";
import HomeHeader from "../widgets/HomeHeader";
import Sidebar from "../components/Sidebar";
import SearchBar from "../widgets/SearchBar";
import { BottomBar } from "../widgets/BottomBar";
import { useSelector } from "react-redux";
import ProfileCard from "../widgets/ProfileCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const BASE_API = import.meta.env.VITE_API_URL;
const API_URL = import.meta.env.VITE_API_URL + "/user/get_user/";

const ProfilePage = () => {
    const { user_id } = useParams();

    const token = useSelector((state) => state.token);
    const [user, setUser] = useState();
    const [user_posts, setUserPosts] = useState();

    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        axios.get(API_URL + user_id,
            config
        ).then(res => {
            const data = res.data;
            setUser(data);
        }).catch((err) => console.log(err));

        axios.get(`${BASE_API}/user/user_tweets/${user_id}`, config).
            then(response => {
                const tweets = response.data.tweets;
                const post_user = response.data.user;
                const formattedTweets = tweets.map((tweet) => {
                    return {
                        ...tweet,
                        name: post_user.Name,
                        email: post_user.email,
                        handle: post_user.user_handle,
                        pfp_path: post_user.picturePath,
                        bannerPath: post_user.bannerPath
                    }
                })
                setUserPosts(formattedTweets)
            }).
            catch(error => console.log(error))

    }, [user_id])

    if (!user) return (
        <div className="flex justify-center items-center">
            <p className="text-white text-3xl">Loading</p>
        </div>
    )

    const { Name, bio, user_handle, email, createdAt, picturePath, bannerPath, _id } = user;
    const { followers, following } = user;

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
                                <ProfileCard name={Name}
                                    bio={bio}
                                    handle={user_handle}
                                    email={email}
                                    createdAt={createdAt}
                                    pfp={picturePath}
                                    bannerPath={bannerPath}
                                    user_id={user_id}
                                    followers={followers}
                                    following={following}
                                />
                                <Feed posts={user_posts} />
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

export default ProfilePage