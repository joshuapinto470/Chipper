import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    token : null,
    posts : [],
    lastPostUpdateTime : null,
};

export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        setLogin : (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
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

export const { setLogin, setLogout, setPost, setPosts, updatePostUpdateTime} = authSlice.actions;
export default authSlice.reducer;