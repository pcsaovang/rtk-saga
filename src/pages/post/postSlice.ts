import { createSlice, createAction } from '@reduxjs/toolkit';

import { RootState } from 'app/store';
import { PostStateInterface, PostInterface, PostPayloadInterface } from 'types/postTypes';

export const FETCH_POSTS = 'pages.posts/FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'pages.posts/FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'pages.posts/FETCH_POSTS_FAILURE';

export const FETCH_POST = 'pages.posts/FETCH_POST';
export const FETCH_POST_SUCCESS = 'pages.posts/FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'pages.posts/FETCH_POST_FAILURE';

const initialState: PostStateInterface = {
  data: null,
  status: 'idle',
};

export const fetchPosts = createAction(FETCH_POSTS);
export const fetchPostsSuccess = createAction<PostInterface[]>(FETCH_POSTS_SUCCESS);
export const fetchPostsFailure = createAction(FETCH_POSTS_FAILURE);

export const fetchPost = createAction<PostPayloadInterface>(FETCH_POST);
export const fetchPostSuccess = createAction<PostInterface>(FETCH_POST_SUCCESS);
export const fetchPostFailure = createAction(FETCH_POST_FAILURE);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostsSuccess, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchPostsFailure, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchPost, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostSuccess, (state, action) => {
        state.status = 'idle';
        state.data = [action.payload];
      })
      .addCase(fetchPostFailure, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectPosts = (state: RootState) => state.posts;

export default postSlice.reducer;
