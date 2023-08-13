import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios'

import {
  getOrderListRequest,
  getOrderListSuccess,
  getOrderListFailure,
  orderProductRequest,
  orderProductSuccess,
  orderProductFailure,
} from 'redux/slicers/order.slice'
import { URL } from 'constants/urlApi'
function* getOrderListSaga(action) {
  try {
    const { userId } = action.payload
    const result = yield axios.get(`${URL.API}orders`, {
      params: {
        userId: userId,
        _embed: 'orderDetails',
      },
    })
    yield put(getOrderListSuccess({ data: result.data }))
  } catch (e) {
    yield put(getOrderListFailure({ error: 'Lỗi' }))
  }
}

function* orderProductSaga(action) {
  try {
    const { data, products, callback } = action.payload
    const result = yield axios.post(`${URL.API}orders`, data)
    for (let i = 0; i < products.length; i++) {
      yield axios.post(`${URL.API}orderDetails`, {
        orderId: result.data.id,
        productId: products[i].id,
        name: products[i].name,
        image: products[i].image,
        price: products[i].price,
        quantity: products[i].quantity,
      })
    }
    yield callback()
    yield put(orderProductSuccess({ data: result.data }))
  } catch (e) {
    yield put(orderProductFailure({ error: 'Lỗi' }))
  }
}

export default function* orderSaga() {
  yield takeEvery(getOrderListRequest.type, getOrderListSaga)
  yield takeEvery(orderProductRequest.type, orderProductSaga)
}
