import { createSlice } from '@reduxjs/toolkit';

import { RootState } from 'app/store';

export interface CommonState {
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CommonState = {
  status: 'idle',
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {},
});

export const selectCommon = (state: RootState) => state.common;

export default commonSlice.reducer;
