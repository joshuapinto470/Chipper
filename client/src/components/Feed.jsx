/* eslint-disable react/prop-types */
import Tweet from "../widgets/Tweet";

const Feed = ({posts}) => {

    if (!posts || posts.length === 0) return (
        <div className="text-white h-screen flex justify-center content-center">
            <h1 className="text-center text-4xl font-bold mt-10">
                Nothing to see here!
            </h1>
        </div>
    )

    return (
        <ul className="list-none">
            <li>
                {posts.map((post) => {
                    return (
                        <div key={post.id}>
                            <Tweet 
                                id = {post.id ? post.id : post._id}
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
                            <hr className="border-gray-800" />
                        </div>
                    )
                })}
            </li>
        </ul>
    )
}

export default Feed