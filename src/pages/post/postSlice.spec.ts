import postReducer, { FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE } from './postSlice';
import { PostStateInterface } from 'types/postTypes';

jest.mock('../apis/postApi');

describe('post reducer', () => {
  const initialState: PostStateInterface = {
    data: null,
    status: 'idle',
  };

  it('should handle initial state', () => {
    expect(postReducer(undefined, { type: 'unknown' })).toEqual({
      data: null,
      status: 'idle',
    });
  });

  it('should handle get posts starting', () => {
    expect(postReducer(initialState, { type: FETCH_POSTS })).toEqual({
      data: null,
      status: 'loading',
    });
  });

  it('should handle get posts success', () => {
    expect(postReducer(initialState, { type: FETCH_POSTS_SUCCESS })).toEqual({
      status: 'idle',
    });
  });

  it('should handle get posts failure', () => {
    expect(postReducer(initialState, { type: FETCH_POSTS_FAILURE })).toEqual({
      data: null,
      status: 'failed',
    });
  });
});
