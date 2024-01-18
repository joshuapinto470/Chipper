/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import HomeHeader from "../widgets/HomeHeader";
import Sidebar from "../components/Sidebar";
import SearchBar from "../widgets/SearchBar";
import { BottomBar } from "../widgets/BottomBar";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import TweetCard from "../widgets/TweetCard";
import {
  getUserTweet,
  getUserInfo,
  batchGetUsers,
} from "../controllers/API.js";
import Loading from "./Loading";
import Feed from "../components/Feed";
import PageNotFound from "./PageNotFound.jsx";

const TweetPage = () => {
  const { tweet_id } = useParams();
  const token = useSelector((state) => state.token);
  const [posts, setPosts] = useState(null);
  const [tweet, setTweet] = useState();
  const [user, setUser] = useState();

  let replies = null;

  useEffect(() => {
    getUserTweet(tweet_id, token)
      .then((response) => {
        setTweet(response.tweet);
        replies = response.replies;
        return getUserInfo(response.tweet.user_id, token);
      })
      .then((user_response) => {
        setUser(user_response);
        let user_ids = replies.map((i) => i.user_id);
        user_ids = [...new Set(user_ids)]; // remove duplicate user id's
        return batchGetUsers(user_ids, token);
      })
      .then((res) => {
        const users = res.users;
        const _posts = replies.map((i) => {
          const usr = users.find((u) => u._id === i.user_id);
          return {
            ...i,
            handle: usr.user_handle,
            name: usr.Name,
            pfp_path: usr.picturePath,
          };
        });
        setPosts(_posts);
        console.log(replies);
        console.log(users);
      })
      .catch((err) => console.log("Error : ", err));
  }, [tweet_id]);

  if (!tweet || !user) return <PageNotFound />;

  return (
    <>
      <div className="lg:p-relative lg:h-screen">
        <div className="lg:flex lg:justify-center">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <main role="main">
            <div className="lg:flex lg:w-[990px]">
              <section className="lg:w-3/5 lg:border lg:border-y-0  lg:max-w-[600px]">
                <HomeHeader />
                <hr></hr>
                <TweetCard
                  id={tweet_id}
                  content={tweet?.content}
                  user_handle={user?.user_handle}
                  user_name={user?.Name}
                  date={"19:07 17th June 2023"}
                  views={tweet?.views}
                  replies={tweet.replies?.length}
                  likes={tweet.likes}
                  pfp={user.picturePath}
                  tweet_image={tweet.imagePath}
                />
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

export default TweetPage;
