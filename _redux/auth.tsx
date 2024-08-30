// import { googleLogout } from '@react-oauth/google'
import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { persistReducer } from 'redux-persist'

import storageLocal from './conditionalStorage'

export const persistKey = 'global'
// Original Reducer
export const authReducer = createSlice({
  name: 'root',
  initialState: {
    errors: undefined,
    data: {},
  },
  reducers: {
    setErrors: (state: any, action: any) => {
      state.errors = action?.payload
    },
    setUser: (state: any, action: any) => {
      state.data = { ...state.data, ...action?.payload }
    },
    logout: (state: any) => {
      state.data = {}
      state.errors = undefined
      // googleLogout()
      localStorage.removeItem(`persist:${persistKey}`)
      localStorage.removeItem(`REACT_QUERY_OFFLINE_CACHE`)
      Cookies.remove(`token`)
    },
  },
})

// Persist Reducer
export const persistedAuthReducer = () =>
  persistReducer(
    {
      key: persistKey,
      version: 1,
      whitelist: ['errors', 'data'],
      storage: storageLocal,
    },
    authReducer.reducer
  )
