import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchReviewsRequest,
  fetchReviewsSuccess,
  fetchReviewsFailure,
} from './reviewsSlice';

function fetchReviewsApi() {
  return fetch('./data.json').then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    return response.json();
  })
}

function* fetchReviewsSaga() {
  try {
    const data = yield call(fetchReviewsApi);
    yield put(fetchReviewsSuccess(data));
  } catch (error) {
    yield put(fetchReviewsFailure(error.message));
  }
}

export default function* rootSaga() {
  yield takeLatest(fetchReviewsRequest.type, fetchReviewsSaga);
}
