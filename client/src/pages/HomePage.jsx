import Feed from "../components/Feed";
import PostTweet from "../widgets/PostTweet";
import HomeHeader from "../widgets/HomeHeader";
import Sidebar from "../components/Sidebar";
import SearchBar from "../widgets/SearchBar";
import { BottomBar } from "../widgets/BottomBar";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setPosts, updatePostUpdateTime } from "../state";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL + "/user/feed";


const HomePage = () => {
    const token = useSelector((state) => state.token);
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const config = { headers : { Authorization: `Bearer ${token}` }};

    useEffect(() => {
        axios.get(API_URL, 
            config
            ).then((response) => {
            let _posts = response.data;
            _posts.sort(function(a, b) { return new Date(a.createdAt) - new Date(b.createdAt) });
            _posts.reverse();
            dispatch(
                setPosts({
                    posts : _posts,
                })
            );
            dispatch(updatePostUpdateTime());
        }).catch((error) => {
            console.log(error.response.status)
            if (error.response.status === 401){
                console.log("Navigating to /");
                dispatch(setLogout());
                navigate("/");
                return;
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="lg:p-relative lg:h-screen bg-[#15202b]">
                <div className="lg:flex lg:justify-center">
                    <div className="hidden lg:block">
                        <Sidebar/>
                    </div>
                    <main role="main">
                        <div className="lg:flex lg:w-[990px]">
                            <section className="lg:w-3/5 lg:border lg:border-y-0 lg:border-gray-800 lg:max-w-[600px]">
                                <HomeHeader />
                                <hr className="border-gray-800"></hr>
                                <PostTweet />
                                <Feed posts={posts} />
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

export default HomePage