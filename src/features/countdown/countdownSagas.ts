import { eventChannel, END, EventChannel } from 'redux-saga';
import { takeLatest, take, put, call, cancelled, CancelledEffect } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { Sequence } from 'types/countdownTypes'
import { addCountdown, processCountdown, START_COUNTDOWN, START_COUNTER } from './countdownSlice';

function counter(seconds: number) {
  return eventChannel((emitter) => {
    const iv = setInterval(() => {
      if (seconds > 0) {
        emitter(seconds);
      } else {
        emitter(END);
      }
      seconds -= 1;
    }, 1000);

    return () => {
      clearInterval(iv);
    };
  });
}

function countdown(timeEnd: number) {
  return eventChannel((emitter) => {
    const iv = setInterval(() => {
      const now = new Date().getTime();
      const distance = timeEnd - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance > 0) {
        emitter({ days, hours, minutes, seconds });
      } else {
        emitter(END);
      }
    }, 1000);

    return () => {
      clearInterval(iv);
    };
  });
}

function* processCounter() {
  const channel: EventChannel<number> = yield call(counter, 60);

  try {
    while (true) {
      const seconds: number = yield take(channel);
      yield put(addCountdown(seconds));
    }
  } finally {
    const canceled: CancelledEffect = yield cancelled();
    if (canceled) {
      channel.close();
    }
    console.log('countdown canceled');
  }
}

function* processCountdownSaga(action: PayloadAction<Sequence<number>>) {
  console.log(action)
  const endTime = new Date(...action.payload).getTime();
  const channel: EventChannel<number> = yield call(countdown, endTime);

  try {
    while (true) {
      const seconds: number = yield take(channel);
      yield put(processCountdown(seconds));
    }
  } finally {
    const canceled: CancelledEffect = yield cancelled();
    if (canceled) {
      channel.close();
    }
    console.log('countdown canceled');
  }
}

export function* countdownSaga() {
  yield takeLatest(START_COUNTDOWN, processCountdownSaga);
  yield takeLatest(START_COUNTER, processCounter);
}
