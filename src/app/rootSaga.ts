import { all, fork } from 'redux-saga/effects';

import postSaga from 'pages/post/postSagas';
import { countdownSaga } from 'features/countdown/countdownSagas';

const sagas = [postSaga, countdownSaga];

export default function* rootSaga() {
  yield all(sagas.map((saga) => fork(saga)));
}
