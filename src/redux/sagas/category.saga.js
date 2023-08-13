import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { URL } from 'constants/urlApi'
import {
  getCategoryListRequest,
  getCategoryListSuccess,
  getCategoryListFailure,
} from 'redux/slicers/category.slice'

function* getCategoryListSaga(action) {
  try {
    const result = yield axios.get(`${URL.API}categories`)
    yield put(getCategoryListSuccess({ data: result.data }))
  } catch (e) {
    yield put(getCategoryListFailure({ error: 'Lỗi' }))
  }
}

export default function* categorySaga() {
  yield takeEvery(getCategoryListRequest.type, getCategoryListSaga)
}
