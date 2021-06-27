import { PayloadAction } from '@reduxjs/toolkit';
import { call, takeEvery } from 'redux-saga/effects';

import { httpClient } from 'utils/httpClient';

function* log(action: PayloadAction) {
  try {
    yield call([httpClient, 'get'], '/posts');
  } catch (error) {
    console.log(error);
  }
}

export default function* counterSaga() {
  console.log('counter saga');
  yield takeEvery('*', log);
}
