import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  breadcrumb: 'Home',
}

export const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState,
  reducers: {
    updateBreadcrumb: (state, action) => {
      state.breadcrumb = action.payload
    },
    resetBreadcrumb: (state, action) => {
      state.breadcrumb = 'Home'
    },
  },
})

export const { updateBreadcrumb, resetBreadcrumb } = breadcrumbSlice.actions

export default breadcrumbSlice.reducer
