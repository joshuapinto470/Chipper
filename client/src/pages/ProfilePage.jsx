/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import { BottomBar } from "../widgets/BottomBar";
import HomeHeader from "../widgets/HomeHeader";
import ProfileCard from "../widgets/ProfileCard";
import Loading from "./Loading";
import PageNotFound from "./PageNotFound";

const BASE_API = import.meta.env.VITE_API_URL;
const API_URL = import.meta.env.VITE_API_URL + "/user/get_user/";

const ProfilePage = () => {
  const { user_id } = useParams();

  const { token } = useSelector((state) => state.user);
  const [user, setUser] = useState();
  const [user_posts, setUserPosts] = useState();

  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    axios
      .get(API_URL + user_id, config)
      .then((res) => {
        const data = res.data;
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
        setUserPosts(null);
        return;
      });

    axios
      .get(`${BASE_API}/user/user_tweets/${user_id}`, config)
      .then((response) => {
        const tweets = response.data.tweets;
        const post_user = response.data.user;
        const formattedTweets = tweets
          .map((tweet) => {
            return {
              ...tweet,
              name: post_user.Name,
              email: post_user.email,
              handle: post_user.user_handle,
              pfp_path: post_user.picturePath,
              bannerPath: post_user.bannerPath,
            };
          })
          .sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        setUserPosts(formattedTweets);
      })
      .catch((error) => {
        setUser(null);
        setUserPosts(null);
      });
  }, [user_id]);

  if (!user) return <PageNotFound />;

  const {
    Name,
    bio,
    user_handle,
    email,
    createdAt,
    picturePath,
    bannerPath,
    _id,
  } = user;
  const { followers, following } = user;

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
                {/* <HomeHeader /> */}
                <hr></hr>
                <ProfileCard
                  name={Name}
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
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
