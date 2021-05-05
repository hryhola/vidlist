import { delay, put, takeEvery } from 'redux-saga/effects'
import { addCount } from './counter.slice';

const countincrementAsyncAction = 'count/incrementAsync';

export const createIncrementAsync = () => ({
  type: countincrementAsyncAction,
});

export function* incrementAsync() {
  yield delay(1000)
  yield put(addCount(1))
}

export function* watchIncrementAsync() {
  yield takeEvery(countincrementAsyncAction, incrementAsync)
}
