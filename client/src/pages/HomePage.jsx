import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import { setLogout, setPosts, updatePostUpdateTime } from "../state";
import { BottomBar } from "../widgets/BottomBar";
import HomeHeader from "../widgets/HomeHeader";
import PostTweet from "../widgets/PostTweet";
import SearchBar from "../widgets/SearchBar";

const API_URL = import.meta.env.VITE_API_URL + "/user/feed";

const HomePage = () => {
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    axios
      .get(API_URL, config)
      .then((response) => {
        let _posts = response.data;
        _posts.sort(function (a, b) {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
        _posts.reverse();
        console.log(_posts)
        dispatch(
          setPosts({
            posts: _posts,
          })
        );
        dispatch(updatePostUpdateTime());
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 401) {
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
      <div className="lg:p-relative lg:h-screen">
        <div className="lg:flex lg:justify-center">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <main role="main">
            <div className="lg:flex lg:w-[990px]">
              <section className="lg:w-3/5 lg:border lg:border-y-0 lg:max-w-[600px]">
                <HomeHeader />
                <hr className="border-slate-200"></hr>
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
  );
};

export default HomePage;
