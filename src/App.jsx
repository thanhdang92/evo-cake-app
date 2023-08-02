import { Routes, Route } from 'react-router-dom'

import './App.css'
import UserLayout from 'layouts/UserLayout'
import HomePage from 'pages/user/Home'
import { ROUTES } from 'constants/routes'
import ProductListPage from 'pages/user/ProductList'
import ProductDetailPage from 'pages/user/ProductDetail'
import RegisterPage from 'pages/Register'
import LoginPage from 'pages/Login'
import CartPage from 'pages/user/Cart'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { getUserInfoRequest } from 'redux/slicers/auth.slice'
import { Row } from 'antd'
import CheckoutPage from 'pages/user/Checkout'
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      const tokenData = jwtDecode(accessToken)
      dispatch(
        getUserInfoRequest({
          id: parseInt(tokenData.sub),
        })
      )
    }
  }, [])

  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path={ROUTES.USER.HOME} element={<HomePage />} />
        <Route
          path={ROUTES.USER.PRODUCT_LIST}
          element={<ProductListPage />}
        ></Route>
        <Route
          path={ROUTES.USER.PRODUCT_DETAIL}
          element={<ProductDetailPage />}
        ></Route>
        <Route path={ROUTES.LOGIN} element={<LoginPage />}></Route>
        <Route path={ROUTES.REGISTER} element={<RegisterPage />}></Route>
        <Route path={ROUTES.USER.CART} element={<CartPage />}></Route>
        <Route path={ROUTES.USER.CHECKOUT} element={<CheckoutPage />}></Route>
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export default App
