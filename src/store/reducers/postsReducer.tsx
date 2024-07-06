import { createSlice } from '@reduxjs/toolkit';
import { TPost } from 'src/types';

interface IInitialState {
    posts: TPost[]
    editPost: TPost | null
    deletePost: TPost | null
    selectedPosts: number[]
}

const initialState: IInitialState = {
    posts: [],
    editPost: null,
    deletePost: null,
    selectedPosts: []
};

const postsReducer = createSlice({
    name: 'postsReducer',
    initialState,
    reducers: {
        setPosts(state, { payload }) {
            state.posts = payload;
        },
        addPost(state, { payload }) {
            state.posts.push(payload)
        },
        setSelectedPosts(state, { payload }) {
            state.selectedPosts = payload;
        },
        setEditPost(state, { payload }) {
            state.editPost = payload
        },
        updatePost(state, { payload }) {
            const postIndex = state.posts.findIndex(post => post.id === payload.id)

            if (postIndex >= 0) {
                state.posts[postIndex].body = payload.body
                state.posts[postIndex].title = payload.title
                state.posts[postIndex].userId = payload.userId
            }
        },
        setDeletePost(state, { payload }) {
            state.deletePost = payload
        }
    },
});

export const { setPosts, addPost, setSelectedPosts, setEditPost, updatePost, setDeletePost } = postsReducer.actions;
export default postsReducer.reducer;
