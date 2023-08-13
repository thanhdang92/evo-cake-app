import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure,
  updateUserInfoRequest,
  updateUserInfoSuccess,
  updateUserInfoFailure,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
} from 'redux/slicers/auth.slice'
import { URL } from 'constants/urlApi'

function* loginSaga(action) {
  try {
    const { data, callback } = action.payload
    const result = yield axios.post(`${URL.API}login`, data)
    yield localStorage.setItem('accessToken', result.data.accessToken)
    yield callback()
    yield put(
      loginSuccess({
        data: result.data.user,
      })
    )
  } catch (e) {
    yield put(loginFailure({ error: 'Email hoặc mật khẩu không đúng' }))
  }
}

function* registerSaga(action) {
  try {
    const { data, callback } = action.payload
    yield axios.post(`${URL.API}register`, data)
    yield callback()
    yield put(registerSuccess())
  } catch (e) {
    yield put(registerFailure({ error: 'Email đã tồn tại' }))
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload
    const result = yield axios.get(`${URL.API}users/${id}`)
    yield put(getUserInfoSuccess({ data: result.data }))
  } catch (e) {
    yield put(getUserInfoFailure({ error: 'Lỗi' }))
  }
}

function* updateUserInfoSaga(action) {
  try {
    const { id, data, callback } = action.payload
    const result = yield axios.patch(`${URL.API}users/${id}`, data)
    yield callback()
    yield put(updateUserInfoSuccess({ data: result.data }))
  } catch (e) {
    yield put(updateUserInfoFailure({ error: 'Lỗi' }))
  }
}

function* changePasswordSaga(action) {
  try {
    const { id, data, callback } = action.payload
    yield axios.post(`${URL.API}login`, {
      email: data.email,
      password: data.password,
    })
    const result = yield axios.patch(`${URL.API}users/${id}`, {
      password: data.newPassword,
    })
    callback()
    yield put(changePasswordSuccess({ data: result.data }))
  } catch (e) {
    yield put(changePasswordFailure({ error: 'Lỗi' }))
  }
}

export default function* categorySaga() {
  yield takeEvery(loginRequest.type, loginSaga)
  yield takeEvery(registerRequest.type, registerSaga)
  yield takeEvery(getUserInfoRequest.type, getUserInfoSaga)
  yield takeEvery(updateUserInfoRequest.type, updateUserInfoSaga)
  yield takeEvery(changePasswordRequest.type, changePasswordSaga)
}
