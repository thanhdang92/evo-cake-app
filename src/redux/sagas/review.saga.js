import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

import {
  getReviewListRequest,
  getReviewListSuccess,
  getReviewListFailure,
  createReviewRequest,
  createReviewSuccess,
  createReviewFailure,
} from 'redux/slicers/review.slice'
import { URL } from 'constants/urlApi'
function* getReviewListSaga(action) {
  try {
    const { productId } = action.payload
    const result = yield axios.get(`${URL.API}reviews`, {
      params: {
        _expand: 'user',
        _sort: 'id',
        _order: 'desc',
        productId: productId,
      },
    })
    yield put(getReviewListSuccess({ data: result.data }))
  } catch (e) {
    yield put(getReviewListFailure('Đã có lỗi xảy ra!'))
  }
}

function* createReviewSaga(action) {
  try {
    const { data, callback } = action.payload
    const result = yield axios.post(`${URL.API}reviews`, data)
    yield callback()
    yield put(getReviewListRequest({ productId: data.productId }))
    yield put(createReviewSuccess({ data: result.data }))
  } catch (e) {
    yield put(createReviewFailure('Đã có lỗi xảy ra!'))
  }
}

export default function* reviewSaga() {
  yield takeEvery(getReviewListRequest.type, getReviewListSaga)
  yield takeEvery(createReviewRequest.type, createReviewSaga)
}
