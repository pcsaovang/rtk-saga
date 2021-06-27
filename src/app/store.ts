import {
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  Action,
  Middleware,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import commonReducer from 'features/common/commonSlice';
import countdownReducer from 'features/countdown/countdownSlice';
import postReducer from 'pages/post/postSlice';
import rootSaga from './rootSaga';

const customMiddleware: Middleware = (store: any) => (next: any) => (action: Action) => {
  return next(action);
};

const sagaMiddleware = createSagaMiddleware();

const defaultMiddleware = getDefaultMiddleware({
  thunk: false,
});
const middleware = [customMiddleware, sagaMiddleware];

export const store = configureStore({
  reducer: {
    common: commonReducer,
    posts: postReducer,
    countdown: countdownReducer,
  },
  middleware: () => defaultMiddleware.concat(middleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
