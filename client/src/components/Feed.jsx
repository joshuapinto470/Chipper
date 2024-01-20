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
      {posts.map((post) => {
        return (
          <li key={post._id}>
            <div>
              <Tweet
                id={post.id ? post.id : post._id}
                post={post}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Feed;
