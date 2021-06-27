import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { fetchPostsApi, fetchPostApi } from 'apis/postApi';
import { PostInterface, PostPayloadInterface } from 'types/postTypes';
import {
  FETCH_POSTS,
  fetchPostsSuccess,
  fetchPostsFailure,
  FETCH_POST,
  fetchPostSuccess,
  fetchPostFailure,
} from './postSlice';

function* fetchPosts() {
  try {
    const posts: PostInterface[] = yield call(fetchPostsApi);
    yield put(fetchPostsSuccess(posts));
  } catch (error) {
    yield put(fetchPostsFailure());
  }
}

function* fetchPost(action: PayloadAction<PostPayloadInterface>) {
  try {
    const post: PostInterface = yield call(fetchPostApi, action.payload.id);
    yield put(fetchPostSuccess(post));
  } catch (error) {
    yield put(fetchPostFailure());
  }
}

export default function* postSaga() {
  yield takeEvery(FETCH_POSTS, fetchPosts);
  yield takeLatest(FETCH_POST, fetchPost);
}
