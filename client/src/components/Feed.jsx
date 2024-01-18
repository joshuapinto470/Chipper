/* eslint-disable react/prop-types */
import Tweet from "../widgets/Tweet";

const Feed = ({ posts }) => {
  if (!posts || posts.length === 0)
    return (
      <div className="h-screen flex justify-center content-center">
        <div>
          <h1 className="text-center text-4xl font-bold mt-[30vh]">
            Nothing to see here!
          </h1>
          <p className="text-md">A bit sad innit?</p>
        </div>
      </div>
    );

  return (
    <ul className="list-none">
      <li>
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <Tweet
                id={post.id ? post.id : post._id}
                name={post.name}
                handle={post.handle}
                imagePath={post.imagePath}
                content={post.content}
                pfp_path={post.pfp_path}
                createdAt={post.createdAt}
                likes={post.likes}
                views={post.views}
                replies={post.replies}
                user_id={post.user_id}
              />
            </div>
          );
        })}
      </li>
    </ul>
  );
};

export default Feed;
