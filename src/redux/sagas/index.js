import { fork } from 'redux-saga/effects'

import productSaga from './product.saga'
import categorySaga from './category.saga'
import reviewSaga from './review.saga'
import authSaga from './auth.saga'
import locationSaga from './location.saga'
import orderSaga from './order.saga'
export default function* rootSaga() {
  yield fork(productSaga)
  yield fork(categorySaga)
  yield fork(reviewSaga)
  yield fork(authSaga)
  yield fork(locationSaga)
  yield fork(orderSaga)
}
