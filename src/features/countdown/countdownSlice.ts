import { createSlice, createAction } from '@reduxjs/toolkit';

import { RootState } from 'app/store';
import { CountdownState, Sequence } from 'types/countdownTypes';

export const START_COUNTDOWN = 'feature.countdown/START_COUNTDOWN';
export const START_COUNTER = 'feature.countdown/START_COUNTER';

const initialState: CountdownState = {
  counter: 0,
  countdown: {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
  status: 'idle',
};

export const startCountdown = createAction<Sequence<number>>(START_COUNTDOWN);

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    addCountdown: (state, action) => {
      state.counter = action.payload;
    },
    processCountdown: (state, action) => {
      state.countdown = action.payload;
    },
  },
});

export const { addCountdown, processCountdown } = commonSlice.actions;

export const selectCountdown = (state: RootState) => state.countdown;

export default commonSlice.reducer;
