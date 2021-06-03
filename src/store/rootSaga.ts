import { all } from 'redux-saga/effects'
// import { watchIncrementAsync } from '../features/counter/counter.sagas'

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
      // call(watchIncrementAsync),
    ])
  }
  