import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios'

import {
  getCityListRequest,
  getCityListSuccess,
  getCityListFailure,
  getDistrictListRequest,
  getDistrictListSuccess,
  getDistrictListFailure,
  getWardListRequest,
  getWardListSuccess,
  getWardListFailure,
} from 'redux/slicers/location.slice'
import { URL } from 'constants/urlApi'
function* getCityListSaga(action) {
  try {
    const result = yield axios.get(`${URL.API}/cities`)
    yield put(getCityListSuccess({ data: result.data }))
  } catch (e) {
    yield put(getCityListFailure({ error: 'Lỗi' }))
  }
}

function* getDistrictListSaga(action) {
  try {
    const { cityCode } = action.payload
    const result = yield axios.get(`${URL.API}districts`, {
      params: {
        parentcode: cityCode,
      },
    })
    yield put(getDistrictListSuccess({ data: result.data }))
  } catch (e) {
    yield put(getDistrictListFailure({ error: 'Lỗi' }))
  }
}

function* getWardListSaga(action) {
  try {
    const { districtCode } = action.payload
    const result = yield axios.get(`${URL.API}wards`, {
      params: {
        parentcode: districtCode,
      },
    })
    yield put(getWardListSuccess({ data: result.data }))
  } catch (e) {
    yield put(getWardListFailure({ error: 'Lỗi' }))
  }
}

export default function* locationSaga() {
  yield takeEvery(getCityListRequest.type, getCityListSaga)
  yield takeEvery(getDistrictListRequest.type, getDistrictListSaga)
  yield takeEvery(getWardListRequest.type, getWardListSaga)
}
