import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import productReducer from 'redux/slicers/product.slice'
import categoryReducer from 'redux/slicers/category.slice'
import reviewReducer from 'redux/slicers/review.slice'
import authReducer from 'redux/slicers/auth.slice'
import cartReducer from 'redux/slicers/cart.slice'
import locationReducer from 'redux/slicers/location.slice'
import orderReducer from 'redux/slicers/order.slice'
import breadcrumbReducer from 'redux/slicers/breadcrumb.slice'

import rootSaga from 'redux/sagas'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    review: reviewReducer,
    auth: authReducer,
    cart: cartReducer,
    location: locationReducer,
    order: orderReducer,
    breadcrumb: breadcrumbReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
})

sagaMiddleware.run(rootSaga)

export { store }
