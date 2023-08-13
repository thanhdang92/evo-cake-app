import { Routes, Route, Link, useLocation } from 'react-router-dom'

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
import { Result, Button, Breadcrumb } from 'antd'
import CheckoutPage from 'pages/user/Checkout'
import ProfilePage from 'pages/user/Profile'
import ContactPage from 'pages/Contact'
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
    <div>
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
          <Route path={ROUTES.USER.PROFILE} element={<ProfilePage />}></Route>
          <Route path={ROUTES.CONTACT} element={<ContactPage />}></Route>
        </Route>
        <Route
          path="*"
          element={
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={
                <Link to={ROUTES.USER.HOME}>
                  <Button type="primary">Back Home</Button>
                </Link>
              }
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
