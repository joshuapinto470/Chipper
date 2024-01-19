import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    token : null,
    posts : [],
    lastPostUpdateTime : null,
};

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers: {
        setLogin : (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        updateUser : (state, action) => {
            state.user = action.payload.user;
        },
        setLogout: (state, action) => {
            state.user = null;
            state.token = null;
            state.posts = [];
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost : (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post.id === action.payload.post.id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        updatePostUpdateTime: (state, action) => {
            state.lastPostUpdateTime = Date.now();
        }
    },
});

export const { setLogin, updateUser, setLogout, setPost, setPosts, updatePostUpdateTime} = userSlice.actions;
export default userSlice.reducer;