import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartList: JSON.parse(localStorage.getItem('cartList')) || [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCartRequest: (state, action) => {
      const { data } = action.payload
      let newCartList = [...state.cartList]
      const productIndex = state.cartList.findIndex(
        (item) => item.productId === data.productId
      )
      if (productIndex !== -1) {
        const newProduct = {
          ...state.cartList[productIndex],
          quantity: state.cartList[productIndex].quantity + data.quantity,
        }
        newCartList.splice(productIndex, 1, newProduct)
      } else {
        newCartList = [data, ...state.cartList]
      }
      localStorage.setItem('cartList', JSON.stringify(newCartList))
      state.cartList = newCartList
    },
    updateCartRequest: (state, action) => {
      const { value, productId } = action.payload
      const productIndex = state.cartList.findIndex(
        (item) => item.productId === productId
      )
      const newProduct = {
        ...state.cartList[productIndex],
        quantity: value,
      }
      state.cartList.splice(productIndex, 1, newProduct)
    },
    removeCartRequest: (state, action) => {
      const { productId } = action.payload
      state.cartList = state.cartList.filter(
        (item) => item.productId !== productId
      )
      localStorage.setItem('cartList', JSON.stringify(state.cartList))
    },
  },
})

export const { addToCartRequest, updateCartRequest, removeCartRequest } =
  cartSlice.actions

export default cartSlice.reducer
